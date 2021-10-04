import {Body, Controller, Get, Post, Req, Param} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {BoardListRO, BoardRO} from './board.interface';
import {BoardService} from './board.service';
import {Request} from 'express';
import {BoardEntity} from './board.entity';
import {CreateBoardDto, SelectBoardDto} from './dto';
import {Result} from 'src/common/common.interface';

@ApiBearerAuth()
@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Get('list')
  async getBoardList(@Req() request: Request): Promise<BoardListRO> {
    try {
      // 이거 auth 쉽게 하는 authentication module 구현 필요 (@성흠)
      if (!(request.session && request.session.user && request.session.user.unit)) {
        return {
          result: 'fail',
        };
      } else {
        const list : BoardEntity[] = await this.boardService.getBoardList(request.session.user.unit.id);
        return {
          result: 'success',
          boards: list,
        };
      }
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }

  @Post('create')
  async create(@Body() boardData: CreateBoardDto): Promise<BoardRO> {
    try {
      const savedBoard = await this.boardService.create(boardData);
      return {result: Result.SUCCESS, board: savedBoard};
    } catch (err) {
      return {result: Result.ERROR, message: err};
    }
  }

  @Get(':id')
  async getBoardData(
      @Param('id') id: number,
      @Body() selectDto: SelectBoardDto,
  ): Promise<BoardRO> {
    try {
      const loadedBoard: BoardEntity =
        await this.boardService.getBoardData(id, selectDto);
      return {
        result: Result.SUCCESS,
        board: loadedBoard,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err,
      };
    }
  }
}
