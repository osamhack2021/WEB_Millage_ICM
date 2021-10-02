import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PollEntity} from './poll/poll.entity';
import {PostRO} from './post.interface';
import {CreatePostDto} from './dto';

@Injectable()
export class PostService {
  constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        @InjectRepository(PollEntity)
        private readonly pollRepository: Repository<PollEntity>,
  ) {}

  async create(dto: CreatePostDto): Promise<PostRO> {
    const newPost: PostEntity = this.postRepository.create(dto);
    const newPoll = this.pollRepository.create(dto);
    try {
      await this.postRepository.save(newPost);
      await this.pollRepository.save(newPoll);
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }
}
