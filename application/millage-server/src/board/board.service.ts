import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PostEntity} from '../post/post.entity';
import {FindManyOptions, Like, Repository} from 'typeorm';
import {BoardEntity} from './board.entity';
import {CreateBoardDto, SelectBoardDto} from './dto';
import {PaginationObject} from './board.interface';

const POSTS_PER_PAGE = 10;
const POSTS_PER_BOARD_PREVIEW = 4;

@Injectable()
export class BoardService {
  constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,

        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
  ) {}


  async getBoardList(id: number) : Promise<BoardEntity[]> {
    const list = await this.boardRepository.find({
      where: {
        unitId: id,
      },
    });

    return list;
  }

  async getBoardListWithPosts(unitId: number): Promise<BoardEntity[]> {
    const boards = await this.boardRepository.find({
      where: {
        unitId: unitId,
      },
    });
    return await Promise.all(boards.map(async (board) => {
      board.posts = await this.postRepository.find({
        where: {board},
        order: {createdAt: 'DESC'},
        take: POSTS_PER_BOARD_PREVIEW,
      });
      return board;
    }));
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

  private async getPaginationObject(
      boardId: number,
      searchKeyword: string,
      curPage: number,
  ): Promise<PaginationObject> {
    searchKeyword = searchKeyword ? searchKeyword : '';
    const searchOptions: FindManyOptions<PostEntity> = {
      where: {
        boardId: boardId,
        title: Like(searchKeyword),
        content: Like(searchKeyword),
      },
    };
    const totalCounts = await this.postRepository.count(searchOptions);
    const totalPages = Math.ceil(totalCounts / 10);
    searchOptions.skip = (curPage - 1) * POSTS_PER_PAGE;
    searchOptions.take = POSTS_PER_PAGE;
    searchOptions.relations = ['images'];
    const posts = await this.postRepository.find(searchOptions);
    return <PaginationObject>{posts, curPage, totalCounts, totalPages};
  }

  async getBoardData(id: number, dto: SelectBoardDto): Promise<BoardEntity> {
    let board: BoardEntity = null;
    try {
      board = await this.boardRepository.findOne(id);
      board.paginationObject = await this.getPaginationObject(board.id, dto.search, dto.page);
      return board;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
