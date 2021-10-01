import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PostRO} from './post.interface';

@Injectable()
export class PostService {
  constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(dto: CreatePostDto): Promise<PostRO> {
    const newPost: PostEntity = this.postRepository.create(dto);
    try {
      await this.postRepository.save(newPost);
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }
}