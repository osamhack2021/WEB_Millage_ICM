import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BoardEntity} from './board.entity';

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
}
