import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { PostEntity } from 'src/post/post.entity';
import {Repository} from 'typeorm';
import {BoardEntity} from './board.entity';
import {BoardRO} from './board.interface';
import {CreateBoardDto, SelectBoardDto} from './dto';

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
        unit: id,
      },
    });

    return list;
  }

  async create(dto: CreateBoardDto): Promise<BoardEntity> {
    const newBoard = this.boardRepository.create(dto);
    try {
      const savedBoard = await this.boardRepository.save(newBoard);
      return savedBoard;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getBoardData(id: number, dto: SelectBoardDto): Promise<BoardEntity> {
    let board: BoardEntity = null;
    try {
      board = await this.boardRepository.findOne(id);
      board.posts = await this.postRepository.find() // need to implement
    } catch (err) {
      throw new Error(`Cannot find board by id ${id}`);
    }
  }
}
