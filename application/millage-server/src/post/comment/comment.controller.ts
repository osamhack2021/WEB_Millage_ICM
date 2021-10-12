import {Get, Post, Body, Controller, Param, Delete, Patch, Req, ParseIntPipe} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto';
import {Result, ResultObject} from '../../common/common.interface';
import {CommentRO} from './comment.interface';

@ApiBearerAuth()
@ApiTags('comment')
@Controller({path: 'post'})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId/comment/create')
  async create(
    @Req() req: Request,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
  ): Promise<CommentRO> {
    try {
      const userId = req.session.user.id;
      const savedComment = await this.commentService.create(postId, userId, dto);
      return {result: Result.SUCCESS, comment: savedComment};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Get('/:postId/comment/delete/:commentId')
  async delete(
    @Req() req: Request,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<ResultObject> {
    try {
      const userId = req.session.user.id;
      if (await this.commentService.delete(postId, userId, commentId)) {
        return {result: Result.SUCCESS};
      }
      return {result: Result.FAIL, message: '작성자 id가 맞지 않습니다.'};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
