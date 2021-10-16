import {
  Body, Controller, Get, Post, Req, Param, Query, Patch, ParseIntPipe, Delete,
} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {BoardListRO, BoardRO, PostRO} from './board.interface';
import {BoardService} from './board.service';
import {Request} from 'express';
import {BoardEntity} from './board.entity';
import {CreateBoardDto, BoardIdParam, UpdateBoardDto} from './dto';
import {DeleteRO, Result} from '../common/common.interface';
import {Roles} from '../user_role/user_role.decorator';
import {Role} from '../user_role/user_role.interface';
import {UserData} from '../user/user.interface';

@ApiBearerAuth()
@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Get('recruitAndPollList')
  async getBoardRecruitAndPollList(@Req() req: Request) : Promise<PostRO> {
    try {
      const posts = await this.boardService.getRecruitAndPollList(+req.session.user.unit.id);
      return {
        result: 'success',
        posts: posts,
      };
    } catch (err) {
      return {
        result: 'error',
        message: err.message,
      };
    }
  }

  @Get('list')
  async getBoardList(@Req() request: Request): Promise<BoardListRO> {
    try {
      // 이거 auth 쉽게 하는 authentication module 구현 필요 (@성흠) -> 이렇게 안하고 주말 중으로 guard 구현 예정임
      if (!(request.session && request.session.user && request.session.user.unit)) {
        return {
          result: 'fail',
        };
      } else {
        const list : BoardEntity[] = await this.boardService.getBoardList(request.session.user.unit.id, request.session.user.id);
        return {
          result: 'success',
          boards: list,
        };
      }
    } catch (err) {
      return {
        result: 'error',
        message: err.message,
      };
    }
  }
  @Get('listWithPosts')
  async getBoardListWithPosts(@Req() request: Request): Promise<BoardListRO> {
    const session = request.session;
    try {
      if (!(session && session.user && session.user.unit)) {
        return {
          result: Result.FAIL,
          message: 'Failed to get right session info',
        };
      } else {
        const boardListWithPosts : BoardEntity[] = await this.boardService.getBoardListWithPosts(session.user.unit.id, session.user.id);
        return {
          result: Result.SUCCESS,
          boards: boardListWithPosts,
        };
      }
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Post('create')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async create(@Body() boardData: CreateBoardDto): Promise<BoardRO> {
    try {
      const savedBoard = await this.boardService.create(boardData);
      return {result: Result.SUCCESS, board: savedBoard};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Patch('/:boardId')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: UpdateBoardDto,
    @Req() req: Request,
  ): Promise<BoardRO> {
    try {
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        board: await this.boardService.update(dto, boardId, unitId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Delete('/:boardId')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async delete(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Req() req: Request,
  ): Promise<DeleteRO> {
    try {
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        deletedId: await this.boardService.delete(boardId, unitId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Get(':id?')
  async getBoardData(
      @Param() params: BoardIdParam,
      @Query('page') page: string,
      @Query('search') searchKeyword: string,
  ): Promise<BoardRO> {
    try {
      const loadedBoard: BoardEntity =
        await this.boardService.getBoardData(params.id, parseInt(page), searchKeyword);
      return {
        result: Result.SUCCESS,
        board: loadedBoard,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Post('star/:boardId')
  async toggleStar(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Req() req: Request,
  ): Promise<BoardRO> {
    try {
      await this.boardService.toggleStar(boardId, req.session.user.id);
      return {result: Result.SUCCESS};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
