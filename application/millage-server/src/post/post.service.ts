import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PostRO, PostType} from './post.interface';
import {CreatePostDto} from './dto';
import {PollItemEntity} from './poll/poll_item.entity';

@Injectable()
export class PostService {
  constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        @InjectRepository(PollItemEntity)
        private readonly pollItemRepository: Repository<PollItemEntity>,
  ) {}

  private createPollItem(
      description: string,
      postId: number,
  ): Promise<PollItemEntity> {
    const newPollItem = new PollItemEntity();
    newPollItem.description = description;
    newPollItem.postId =postId;
    return this.pollItemRepository.save(newPollItem);
  }

  private async createPoll(postId: number, pollList: string[]) {
    await Promise.all(pollList.map((description: string): Promise<PollItemEntity> => {
      return this.createPollItem(description, postId);
    }));
    return;
  }

  async create(dto: CreatePostDto): Promise<PostRO> {
    const newPost: PostEntity = this.postRepository.create(dto);
    const {pollList} = dto;
    try {
      const savedPost: PostEntity = await this.postRepository.save(newPost);
      if (savedPost.postType == PostType.POLL && pollList.length !== 0) {
        await this.createPoll(savedPost.id, pollList);
      }
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }
}
