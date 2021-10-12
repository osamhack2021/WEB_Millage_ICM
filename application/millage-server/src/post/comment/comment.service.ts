import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {Repository} from 'typeorm';
import {CreateCommentDto} from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(postId: number, userId: number, dto: CreateCommentDto): Promise<CommentEntity> {
    const newComment: CommentEntity = this.commentRepository.create(dto);
    newComment.postId = postId;
    newComment.writerId = userId;
    const savedComment = await this.commentRepository.save(newComment);
    return savedComment;
  }

  private validateForDeletion(postId: number, userId: number, comment: CommentEntity): void {
    if (postId !== comment.postId) {
      throw new Error(`Not matched post id ${postId}`);
    }
    if (comment === undefined) {
      throw new Error(`Cannot find comment by id ${comment.id}`);
    }
    if (comment.writerId !== userId) {
      throw new Error(`Not matched writer id ${userId}`);
    }
    return;
  }

  async delete(postId: number, userId: number, commentId: number): Promise<boolean> {
    let comment: CommentEntity = null;
    try {
      comment = await this.commentRepository.findOne(commentId, {relations: ['replies']});
    } catch (err) {
      throw new Error(err.message);
    }

    this.validateForDeletion(postId, userId, comment);

    if (comment.replies.length !== 0) {
      comment.content = '삭제된 댓글입니다.';
      await this.commentRepository.save(comment);
      return true;
    }
    await this.commentRepository.delete(commentId);
    return true;
  }
}
