import {Get, Post, Body, Controller, Param, Delete, Patch, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {PostService} from './post.service';
import {PostRO} from './post.interface';
import {CreatePostDto, PostParams, GetPostParams, UpdatePostDto, VoteParams} from './dto';
import {Result, ResultObject} from '../common/common.interface';

@ApiBearerAuth()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async register(@Body() postdata : CreatePostDto): Promise<PostRO> {
    try {
      const savedPost = await this.postService.create(postdata);
      return {
        result: Result.SUCCESS,
        post: savedPost,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Get(':id')
  async get(@Param() params: GetPostParams): Promise<PostRO> {
    try {
      const selectedPost = await this.postService.get(params.id);
      return {
        result: Result.SUCCESS,
        post: selectedPost,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Delete(':id')
  async delete(@Param() params: PostParams): Promise<ResultObject> {
    try {
      if (!(await this.postService.delete(params.id))) {
        return {
          result: Result.FAIL,
          message: 'Nothing affected',
        };
      }
      return {result: Result.SUCCESS};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param() params: PostParams,
    @Body() postdata: UpdatePostDto
  ): Promise<ResultObject> {
    try {
      if (await this.postService.update(params.id, postdata)) {
        return {result: Result.SUCCESS};
      }
      return {result: Result.FAIL, message: 'Nothing changed'};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Post('/heart/:postId')
  async toggleHeart(@Param('postId') postId: number, @Req() req: Request) {
    try {
      const userId = req.session.user.id;
      await this.postService.toggleHeart(postId, userId);
      return {result: Result.SUCCESS};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Post('/:postId/poll/:pollId')
  async vote(@Param() params: VoteParams, @Req() req: Request) {
    try {
      const userId = req.session.user.id;
      await this.postService.vote(parseInt(params.postId), userId, parseInt(params.pollId));
      return {result: Result.SUCCESS};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }
}
