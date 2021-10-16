import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {UserEntity} from '../../user/user.entity';
import {Repository} from 'typeorm';
import {CreateCommentDto, UpdateCommentDto} from './dto';
import { Role } from 'src/user_role/user_role.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(postId: number, userId: number, dto: CreateCommentDto): Promise<CommentEntity> {
    const newComment: CommentEntity = this.commentRepository.create(dto);
    newComment.postId = postId;
    newComment.writerId = userId;
    const savedComment = await this.commentRepository.save(newComment);
    savedComment.heartCount = 0;
    savedComment.writer = await this.userRepository.findOne(
        userId, {select: ['id', 'fullname', 'nickname']});
    return savedComment;
  }

  private validateComment(writerId: number, comment: CommentEntity, role: Role): void {
    if (comment === undefined) {
      throw new Error(`Cannot find comment by id ${comment.id}`);
    }
    if (comment.writerId !== writerId && role != 'ADMIN' && role != 'SUPER_ADMIN') {
      throw new Error(`Not matched writer id ${writerId}`);
    }
    return;
  }

  async delete(writerId: number, commentId: number, role: Role): Promise<CommentEntity> {
    let comment: CommentEntity = null;
    try {
      comment = await this.commentRepository.findOne(commentId);
    } catch (err) {
      throw new Error(err.message);
    }
    this.validateComment(writerId, comment, role);
    const replies = await this.commentRepository.findOne({
      where: {
        parentCommentId: commentId
      }
    });
    if (replies) {
      comment.content = '삭제된 댓글입니다.';
      comment.isDeleted = true;
      comment.writer = await this.userRepository.findOne(
        comment.writerId, {select: ['id', 'fullname', 'nickname']});
      await this.commentRepository.save(comment);
      return comment;
    }
    await this.commentRepository.delete(commentId);
    return null;
  }

  async update(dto: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(dto.id);
    // this.validateComment(dto.postId, dto.writerId, comment);
    if (comment.isDeleted) {
      throw new Error('This comment has been deleted');
    }
    const updateResult = await this.commentRepository.update(dto.id, dto);
    if (updateResult.affected === 0) {
      throw new Error('Unknown error');
    }
    return updateResult.generatedMaps[0] as CommentEntity;
  }

  async toggleHeart(commentId: number, userId: number): Promise<boolean> {
    const comment = await this.commentRepository.findOne(
        commentId, {relations: ['hearts']}
    );
    const isNotExist = comment.hearts.every(
        (user: UserEntity) => user.id !== userId
    );
    if (isNotExist) {
      const user = await this.userRepository.findOne(userId);
      comment.hearts.push(user);
    } else {
      comment.hearts = comment.hearts.filter(
          (user: UserEntity) => user.id === userId
      );
    }
    await this.commentRepository.save(comment);
    return true;
  }
}
