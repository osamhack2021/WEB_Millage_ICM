import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {UserEntity} from '../../user/user.entity';
import {Repository} from 'typeorm';
import {CreateCommentDto, UpdateCommentDto} from './dto';

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
    return savedComment;
  }

  private validateComment(postId: number, writerId: number, comment: CommentEntity): void {
    if (comment === undefined) {
      throw new Error(`Cannot find comment by id ${comment.id}`);
    }
    if (postId !== comment.postId) {
      throw new Error(`Not matched post id ${postId}`);
    }
    if (comment.writerId !== writerId) {
      throw new Error(`Not matched writer id ${writerId}`);
    }
    return;
  }

  async delete(postId: number, writerId: number, commentId: number): Promise<boolean> {
    let comment: CommentEntity = null;
    try {
      comment = await this.commentRepository.findOne(commentId, {relations: ['replies']});
    } catch (err) {
      throw new Error(err.message);
    }

    this.validateComment(postId, writerId, comment);

    if (comment.replies.length !== 0) {
      comment.content = '삭제된 댓글입니다.';
      comment.isDeleted = true;
      await this.commentRepository.save(comment);
      return true;
    }
    await this.commentRepository.delete(commentId);
    return true;
  }

  async update(dto: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(dto.id);
    this.validateComment(dto.postId, dto.writerId, comment);
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
