import { Controller, Get, Render, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BoardListRO } from './board.interface';
import { BoardService } from './board.service';
import {Request} from 'express';
import { BoardEntity } from './board.entity';

@ApiBearerAuth()
@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Get('list')
  async getBoardList(@Req() request: Request): Promise<BoardListRO> {
    try{
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
    } catch(err) {
        return {
          result: 'error',
          message: err
        };
    }
  }

}
