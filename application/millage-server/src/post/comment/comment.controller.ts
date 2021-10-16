import {Post, Patch, Body, Controller, Param, Delete, Req, ParseIntPipe} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {CommentService} from './comment.service';
import {CreateCommentDto, DeleteCommentDTO, UpdateCommentDto} from './dto';
import {Result, ResultObject} from '../../common/common.interface';
import {CommentRO} from './comment.interface';

@ApiBearerAuth()
@ApiTags('comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/post/:postId/comment')
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

  @Delete('/comment/:commentId')
  async delete(
    @Req() req: Request,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<DeleteCommentDTO> {
    try {
      const userId = req.session.user.id;
      const role = req.session.user.role.name;
      const comment = await this.commentService.delete(userId, commentId, role);
      
      return {
        result: Result.SUCCESS,
        comment: comment ? comment: undefined,
        id: commentId,
      };
      
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Patch('/post/:postId/comment/:commentId')
  async update(
    @Req() req: Request,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: UpdateCommentDto,
  ): Promise<CommentRO> {
    try {
      const writerId = req.session.user.id;
      Object.assign(dto, {id: commentId, postId, writerId});
      const updatedComment = await this.commentService.update(dto);
      return {result: Result.SUCCESS, comment: updatedComment};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Post('/comment/:commentId/heart')
  async toggleHeart(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: Request
  ): Promise<ResultObject> {
    try {
      const userId = req.session.user.id;
      await this.commentService.toggleHeart(commentId, userId);
      return {result: Result.SUCCESS};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
