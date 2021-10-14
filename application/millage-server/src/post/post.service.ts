import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindConditions, Repository} from 'typeorm';
import {PostEntity} from './post.entity';
import {PostType} from './post.interface';
import {CreatePostDto, UpdatePostDto} from './dto';
import {PollEntity} from './poll/poll.entity';
import {UserEntity} from '../user/user.entity';
import {RecruitEntity} from './recruit/recruit.entity';
import {BoardEntity} from '../board/board.entity';
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
      if (savedPost.postType === PostType.POLL) {
        await this.createPoll(savedPost.id, pollList);
      }
      return savedPost;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async get(id: number, userId: number): Promise<PostEntity> {
    try {
      const post = await this.postRepository.findOne(
          id, {relations: [
            'pollItems', 'pollItems.voters',
            'images', 'writer', 'board',
            'recruitStatus', 'recruitStatus.currentMember',
          ]}
      );
      if (post.postType === PostType.RECRUIT) {
        let isMember: boolean;
        if ( JSON.stringify(post.recruitStatus.currentMember) === '[]' ) {
          isMember = false;
        } else {
          isMember = post.recruitStatus.currentMember.every(
              (member) => member.id === userId
          );
        }
        post.recruitStatus.isMember = isMember;
      }
      return post;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async isVoter(id: number, userId: number): Promise<boolean> {
    const pollItems = await this.pollRepository.find({where: {postId: id}, relations: ['voters']});
    return pollItems.some((pollItem) => pollItem.voters.some((voter) => voter.id === userId));
  }

  private async getDeleteFindCondition(
      postId: number, userData: UserData): Promise<FindConditions<PostEntity>> {
    if (userData.role.name === Role.NORMAL_USER) {
      return {id: postId, writerId: userData.id};
    }
    if (userData.role.name === Role.SUPER_ADMIN) {
      return {id: postId};
    }
    // ADMIN
    const board = (await this.postRepository.findOne(postId, {relations: ['board']})).board;
    if (board.unitId === userData.unit.id) {
      return {id: postId};
    }
    throw new Error('Not authorized admin for this board');
  }

  async delete(postId: number, userData: UserData): Promise<boolean> {
    try {
      const findConditions = await this.getDeleteFindCondition(postId, userData);
      const deleteResult = await this.postRepository.delete(findConditions);
      if (deleteResult.affected === 0) {
        throw new Error(`No matched post with id ${postId} writerId ${userData.id}`);
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
