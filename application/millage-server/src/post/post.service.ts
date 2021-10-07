import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PostType} from './post.interface';
import {CreatePostDto, UpdatePostDto} from './dto';
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
    newPollItem.postId = postId;
    return this.pollItemRepository.save(newPollItem);
  }

  private async createPoll(postId: number, pollList: string[]) {
    await Promise.all(pollList.map((description: string): Promise<PollItemEntity> => {
      return this.createPollItem(description, postId);
    }));
    return;
  }

  async create(dto: CreatePostDto): Promise<PostEntity> {
    const newPost: PostEntity = this.postRepository.create(dto);
    const {pollList} = dto;
    try {
      const savedPost: PostEntity = await this.postRepository.save(newPost);
      if (savedPost.postType === PostType.POLL) {
        await this.createPoll(savedPost.id, pollList);
      }
      return savedPost;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async get(id: number): Promise<PostEntity> {
    try {
      return await this.postRepository.findOne(
          id, {relations: ['pollItems', 'images']}
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      if (!(await this.postRepository.delete(id)).affected) {
        return false;
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(id: number, postdata: UpdatePostDto): Promise<boolean> {
    const previousPost = await this.postRepository.findOne(id);
    if (previousPost === undefined) {
      throw new Error(`Cannot find post by id ${id}`);
    }
    try {
      const changes = this.postRepository.create(postdata);
      if (!(await this.postRepository.update(id, changes)).affected) {
        return false;
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
