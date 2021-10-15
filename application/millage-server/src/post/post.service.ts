import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PostType} from './post.interface';
import {CreatePostDto, UpdatePostDto} from './dto';
import {PollEntity} from './poll/poll.entity';
import {UserEntity} from '../user/user.entity';
import {RecruitEntity} from './recruit/recruit.entity';
import {BoardEntity} from '../board/board.entity';
import {CommentEntity} from './comment/comment.entity';
import {UserData} from '../user/user.interface';
import {Role} from '../user_role/user_role.interface';

@Injectable()
export class PostService {
  constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        @InjectRepository(PollEntity)
        private readonly pollRepository: Repository<PollEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(RecruitEntity)
        private readonly recruitRepository: Repository<RecruitEntity>,

        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  private createPollItem(
      content: string,
      postId: number,
  ): Promise<PollEntity> {
    const newPollItem = new PollEntity();
    newPollItem.content = content;
    newPollItem.postId = postId;
    return this.pollRepository.save(newPollItem);
  }

  private async createPoll(postId: number, pollList: string[]) {
    await Promise.all(pollList.map((content: string): Promise<PollEntity> => {
      return this.createPollItem(content, postId);
    }));
    return;
  }

  async create(dto: CreatePostDto, user: UserData): Promise<PostEntity> {
    const newPost: PostEntity = this.postRepository.create(dto);
    const targetBoard: BoardEntity = await this.boardRepository.findOne(dto.boardId);

    if (user.role.name !== Role.SUPER_ADMIN && user.unit.id !== targetBoard.unitId) {
      throw new Error('Different unit id');
    }
    const {pollList} = dto;
    try {
      newPost.writerId = user.id;
      const savedPost: PostEntity = await this.postRepository.save(newPost);
      switch (savedPost.postType) {
        case PostType.POLL: {
          await this.createPoll(savedPost.id, pollList);
          break;
        }
        case PostType.RECRUIT: {
          const newRecruit = this.recruitRepository.create({
            totalMember: dto.totalMember,
            postId: savedPost.id,
          });
          await this.recruitRepository.save(newRecruit);
        }
      }
      if (savedPost.postType === PostType.POLL) {
        await this.createPoll(savedPost.id, pollList);
      }
      return savedPost;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async get(id: number, userData: UserData): Promise<PostEntity> {
    const post = await this.postRepository.createQueryBuilder('post')
        .where('post.id= :id', {id: id})
        .select([
          'post.id', 'post.title', 'post.postType', 'post.content',
          'post.createdAt',
          'writer.id', 'writer.fullname', 'writer.nickname',
          'board',
          'pollItems',
          'voters.id', 'voters.fullname', 'voters.nickname',
          'images.id', 'images.url', 'images.originalName',
          'comments.id', 'comments.content', 'comments.createdAt',
          'comments.isDeleted', 'comments.parentCommentId',
          'commentHearts.id',
          'recruitStatus',
          'currentMember.id', 'currentMember.fullname', 'currentMember.nickname',
          'hearts.id',
        ])
        .leftJoin('post.writer', 'writer')
        .leftJoin('post.board', 'board')
        .leftJoin('post.pollItems', 'pollItems')
        .leftJoin('pollItems.voters', 'voters')
        .leftJoin('post.comments', 'comments')
        .leftJoin('post.images', 'images')
        .leftJoin('comments.hearts', 'commentHearts')
        .leftJoin('post.recruitStatus', 'recruitStatus')
        .leftJoin('recruitStatus.currentMember', 'currentMember')
        .leftJoin('post.hearts', 'hearts')
        .getOne();
    console.log(post);
    if (post.board.unitId !== userData.unit.id) {
      throw new Error('Not authorized user');
    }
    // isMember
    if (post.recruitStatus &&
        post.recruitStatus.currentMember.some(
            (user: UserEntity) => user.id === userData.id)) {
      post.recruitStatus.isMember = true;
    }
    return post;
  }

  async isVoter(id: number, userId: number): Promise<boolean> {
    const pollItems = await this.pollRepository.find({where: {postId: id}, relations: ['voters']});
    return pollItems.some((pollItem) => pollItem.voters.some((voter) => voter.id === userId));
  }

  private async getPostToChange(postId: number, userData: UserData): Promise<PostEntity> {
    const post = await this.postRepository.findOne(postId, {relations: ['board']});
    switch (userData.role.name) {
      case Role.SUPER_ADMIN: {
        return post;
      }
      case Role.ADMIN: {
        if (post.board.unitId === userData.unit.id) {
          return post;
        }
        return null;
      }
      case Role.NORMAL_USER: {
        if (post.writerId === userData.id) {
          return post;
        }
      }
    }
    return null;
  }

  async delete(postId: number, userData: UserData): Promise<number> {
    if (!this.getPostToChange(postId, userData)) {
      throw new Error(`Not authorized user`);
    }
    const deleteResult = await this.postRepository.delete(postId);
    if (deleteResult.affected === 0) {
      throw new Error(`Unknown error occured`);
    }
    return postId;
  }

  async update(
      postId: number, postdata: UpdatePostDto, userData: UserData
  ): Promise<PostEntity> {
    const postToUpdate = await this.getPostToChange(postId, userData);
    if (postToUpdate === undefined) {
      throw new Error(`Not authorized or no post with id ${postId}`);
    }
    Object.assign(postToUpdate, postdata);
    const updateResult = await this.postRepository.save(postToUpdate);
    return updateResult;
  }

  async toggleHeart(postId: number, userId: number): Promise<boolean> {
    const targetPost = await this.postRepository.findOne(
        postId,
        {relations: ['hearts']}
    );
    const isNotExist = targetPost.hearts.every(
        (user: UserEntity) => user.id !== userId
    );
    if (isNotExist) {
      const user = await this.userRepository.findOne(userId);
      targetPost.hearts.push(user);
    } else {
      targetPost.hearts = targetPost.hearts.filter((user: UserEntity) => user.id !== userId);
    }
    await this.postRepository.save(targetPost);
    return true;
  }

  async toggleRecruit(postId: number, userId: number): Promise<RecruitEntity> {
    const targetPost = await this.postRepository.findOne(
        postId, {relations: ['recruitStatus', 'recruitStatus.currentMember']});
    const recruit = targetPost.recruitStatus;
    const isNotExist = recruit.currentMember.every(
        (user: UserEntity) => user.id !== userId
    );
    if (isNotExist) {
      const user = await this.userRepository.findOne(userId);
      recruit.currentMember.push(user);
      recruit.isMember = true;
    } else {
      recruit.currentMember = recruit.currentMember.filter(
          (user: UserEntity) => user.id !== userId
      );
      recruit.isMember = false;
    }
    await this.recruitRepository.save(recruit);
    return recruit;
  }

  async vote(postId: number, userId: number, pollId: number): Promise<boolean> {
    const targetPost = await this.postRepository.findOne(
        postId, {relations: ['pollItems', 'pollItems.voters']}
    );
    const targetPollItem: PollEntity = targetPost.pollItems.filter((poll) => poll.id === pollId)[0];

    let pollUserExists: PollEntity = null;
    for (const pollItem of targetPost.pollItems) {
      if (pollItem.voters.some((voter) => voter.id == userId)) {
        pollUserExists = pollItem;
        break;
      }
    }

    if (pollUserExists && pollUserExists.id === pollId) { // canceling
      targetPollItem.voters = targetPollItem.voters.filter((voter) => voter.id === userId);
      await this.pollRepository.save(targetPollItem);
      return true;
    }

    const user: UserEntity = await this.userRepository.findOne(userId);
    if (pollUserExists) { // changing choice
      pollUserExists.voters = pollUserExists.voters.filter((voter) => voter.id === userId);
      await this.pollRepository.save(pollUserExists);
    }
    targetPollItem.voters.push(user);
    await this.pollRepository.save(targetPollItem);
    return true;
  }
}
