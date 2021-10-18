import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PostEntity} from '../post/post.entity';
import {Brackets, Repository} from 'typeorm';
import {BoardEntity} from './board.entity';
import {CreateBoardDto, UpdateBoardDto} from './dto';
import {PaginationObject} from './board.interface';
import {UserEntity} from '../user/user.entity';

const POSTS_PER_PAGE = 10;
const POSTS_PER_BOARD_PREVIEW = 4;

@Injectable()
export class BoardService {
  constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,

        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
  ) {}


  async getBoardList(id: number, userId: number) : Promise<BoardEntity[]> {
    const list = await this.boardRepository.find({
      where: {
        unitId: id,
      },
    });


    const user = await this.userRepository.findOne(
        userId, {relations: ['starredBoards']});

    const ids = [];
    for (const board of user.starredBoards.values()) {
      ids.push(board.id);
    }
    list.forEach((board) => {
      board.isStarred = ids.includes(board.id);
    });

    return list;
  }

  async getBoardListWithPosts(unitId: number, userId: number): Promise<BoardEntity[]> {
    const boards = await this.boardRepository.find({where: {unitId: unitId}});
    for (const board of boards) {
      board.posts = await this.postRepository.createQueryBuilder('post')
          .select([
            'post.id', 'post.title', 'post.postType', 'post.content',
            'post.createdAt',
            'writer.id', 'writer.fullname', 'writer.nickname',
            'comments.id', 'comments.content', 'comments.createdAt',
            'comments.isDeleted', 'comments.parentCommentId',
            'recruitStatus',
            'currentMember.id', 'currentMember.fullname', 'currentMember.nickname',
            'hearts.id',
          ])
          .leftJoin('post.writer', 'writer')
          .leftJoin('post.comments', 'comments')
          .leftJoin('post.recruitStatus', 'recruitStatus')
          .leftJoin('recruitStatus.currentMember', 'currentMember')
          .leftJoin('post.hearts', 'hearts')
          .where('post.boardId = :boardId', {boardId: board.id})
          .orderBy('post.createdAt', 'DESC')
          .take(POSTS_PER_BOARD_PREVIEW)
          .getMany();
    }
    const user = await this.userRepository.findOne(
        userId, {relations: ['starredBoards']});
    for (const board of boards) {
      if (user.starredBoards.some((starredBoard) => starredBoard.id === board.id)) {
        board.isStarred = true;
      }
    }
    return boards;
  }

  async create(dto: CreateBoardDto): Promise<BoardEntity> {
    const newBoard = this.boardRepository.create(dto);
    try {
      const savedBoard = await this.boardRepository.save(newBoard);
      return savedBoard;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(dto: UpdateBoardDto, boardId: number, unitId: number): Promise<BoardEntity> {
    const updateResult = await this.boardRepository.update(
        {id: boardId, unitId: unitId}, dto
    );
    if (updateResult.affected === 0) {
      throw new Error('Cannot find the board');
    }
    return updateResult.generatedMaps[0] as BoardEntity;
  }

  async delete(boardId: number, unitId: number): Promise<number> {
    const deleteResult = await this.boardRepository.delete(
        {id: boardId, unitId: unitId},
    );
    if (deleteResult.affected === 0) {
      throw new Error('Cannot find the board');
    }
    return boardId;
  }

  private async getPaginationObject(
      boardId: number,
      searchKeyword: string,
      curPage: number,
  ): Promise<PaginationObject<PostEntity>> {
    searchKeyword = searchKeyword ? decodeURI(searchKeyword) : '';
    const totalCounts = await this.postRepository.createQueryBuilder('post')
        .where('post.boardId = :boardId', {boardId})
        .andWhere(new Brackets((qb) => {
          qb.where('post.title like :searchKeyword', {searchKeyword: `%${searchKeyword}%`})
              .orWhere('post.content like :searchKeyword', {searchKeyword: `%${searchKeyword}%`});
        }))
        .getCount();
    const totalPages = Math.ceil(totalCounts / 10);
    const skip = (curPage - 1) * POSTS_PER_PAGE;
    const results = await this.postRepository.createQueryBuilder('post')
        .where('post.boardId = :boardId', {boardId})
        .andWhere(new Brackets((qb) => {
          qb.where('post.title like :searchKeyword', {searchKeyword: `%${searchKeyword}%`})
              .orWhere('post.content like :searchKeyword', {searchKeyword: `%${searchKeyword}%`});
        }))
        .select([
          'post.id', 'post.title', 'post.postType', 'post.content',
          'post.createdAt',
          'writer.id', 'writer.fullname', 'writer.nickname',
          'comments.id', 'comments.content', 'comments.createdAt',
          'comments.isDeleted', 'comments.parentCommentId',
          'recruitStatus',
          'currentMember.id', 'currentMember.fullname', 'currentMember.nickname',
          'hearts.id',
        ])
        .leftJoin('post.writer', 'writer')
        .leftJoin('post.comments', 'comments')
        .leftJoin('post.recruitStatus', 'recruitStatus')
        .leftJoin('recruitStatus.currentMember', 'currentMember')
        .leftJoin('post.hearts', 'hearts')
        .orderBy('post.createdAt', 'DESC')
        .skip(skip)
        .take(POSTS_PER_PAGE)
        .getMany();
    return {results, curPage, totalCounts, totalPages};
  }

  async getBoardData(id: number, page: number, searchKeyword: string): Promise<BoardEntity> {
    let board: BoardEntity = null;
    try {
      board = await this.boardRepository.findOne(id);
      board.paginationObject = await this.getPaginationObject(board.id, searchKeyword, page);
      return board;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getRecruitAndPollList(unitId: number) {
    const posts = await this.boardRepository.query(`
    select post.id, post.title, recruit.totalMember,(select count(*) from recruitingUser where recruitId = recruit.id) as currentCount
    from post 
      inner join board on post.boardId = board.id and unitID = ${unitId} and (recruitAllowed = true or pollAllowed = true)
      inner join recruit on recruit.postId = post.id 
      where postType='RECRUIT' order by post.createdAt DESC LIMIT 5
    `);

    return posts;
  }

  async toggleStar(boardId: number, userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne(
        userId, {relations: ['starredBoards']});
    let isAlreadyStarred = false;
    for (const [idx, board] of user.starredBoards.entries()) {
      if (board.id === boardId) {
        isAlreadyStarred = true;
        user.starredBoards.splice(idx, 1);
        break;
      }
    }
    if (!isAlreadyStarred) {
      const board = await this.boardRepository.findOne(boardId);
      user.starredBoards.push(board);
    }
    await this.userRepository.save(user);
    return true;
  }
}
