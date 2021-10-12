import {Get, Post, Body, Controller, Param, Delete, Patch, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto';
import {Result} from '../../common/common.interface';
import {CommentRO} from './comment.interface';

@ApiBearerAuth()
@ApiTags('comment')
@Controller({path: 'post'})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId/comment/create')
  async create(
    @Body() dto: CreateCommentDto,
    @Req() req: Request,
  ): Promise<CommentRO> {
    try {
      const userId = req.session.user.id;
      const savedComment = await this.commentService.create(userId, dto);
      return {
        result: Result.SUCCESS,
        comment: savedComment,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }
}
