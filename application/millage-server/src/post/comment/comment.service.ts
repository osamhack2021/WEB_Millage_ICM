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
}
