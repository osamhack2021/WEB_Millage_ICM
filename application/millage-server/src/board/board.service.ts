import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BoardEntity} from './board.entity';
import {BoardRO} from './board.interface';
import {CreateBoardDto} from './dto';

@Injectable()
export class BoardService {
  constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
  ) {}


  async getBoardList(id: number) : Promise<BoardEntity[]> {
    const list = await this.boardRepository.find({
      where: {
        unit: id,
      },
    });

    return list;
  }

  async create(dto: CreateBoardDto): Promise<BoardRO> {
    const newBoard = this.boardRepository.create(dto);
    try {
      const savedBoard = await this.boardRepository.save(newBoard);
      if (savedBoard) {
        return {
          result: 'success',
          board: savedBoard,
        };
      }
      return {
        result: 'fail',
        message: '알수 없는 오류가 발생했습니다.',
      };
    } catch (err) {
      return {
        result: 'fail',
        message: err,
      };
    }
  }
}
