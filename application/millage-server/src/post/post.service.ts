import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PollEntity} from './poll/poll.entity';
import {PostRO} from './post.interface';
import {CreatePostDto} from './dto';
import {PollItemEntity} from './poll/poll_item.entity';

@Injectable()
export class PostService {
  constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        @InjectRepository(PollEntity)
        private readonly pollRepository: Repository<PollEntity>,

        @InjectRepository(PollItemEntity)
        private readonly pollItemRepository: Repository<PollItemEntity>,
  ) {}

  private createPollItem(
      description: string,
      savedPoll: PollEntity,
  ): Promise<PollItemEntity> {
    const newPollItem = new PollItemEntity();
    newPollItem.description = description;
    newPollItem.pollId = savedPoll.id;
    return this.pollItemRepository.save(newPollItem);
  }

  private async createPoll(postId: number, pollList: string[]) {
    const newPoll = new PollEntity();
    let savedPoll: PollEntity = null;
    newPoll.postId = postId;
    try {
      savedPoll = await this.pollRepository.save(newPoll);
    } catch (err) {
      throw new Error(err);
    }
    await Promise.all(pollList.map((description: string): Promise<PollItemEntity> => {
      return this.createPollItem(description, savedPoll);
    }));
    return;
  }

  async create(dto: CreatePostDto): Promise<PostRO> {
    const newPost: PostEntity = this.postRepository.create(dto);
    const {pollList} = dto;
    try {
      await this.postRepository.save(newPost);
      await this.createPoll(newPost.id, pollList);
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }
}
