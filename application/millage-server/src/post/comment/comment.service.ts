import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(dto: CreateCommentDto): Promise<CommentEntity> {
    const newComment: CommentEntity = this.commentRepository.create(dto);
    const savedComment = await this.commentRepository.save(newComment);
    return savedComment;
  }
}
