import {Get, Post, Body, Controller, Param, Delete, Patch, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {PostService} from './post.service';
import {PostRO, PostType} from './post.interface';
import {CreatePostDto, PostParams, GetPostParams, UpdatePostDto, VoteParams} from './dto';
import {Result, ResultObject} from '../common/common.interface';
import {Roles} from '../user_role/user_role.decorator';
import {Role} from '../user_role/user_role.interface';

@ApiBearerAuth()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @Roles(Role.ADMIN, Role.NORMAL_USER, Role.SUPER_ADMIN)
  async register(
    @Body() postdata : CreatePostDto,
    @Req() req: Request,
  ): Promise<PostRO> {
    try {
      const user = req.session.user;
      const savedPost = await this.postService.create(postdata, user);
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
  async get(@Param() params: GetPostParams, @Req() req: Request): Promise<PostRO> {
    try {
      const selectedPost = await this.postService.get(params.id, req.session.user.id);
      const postRO: PostRO = {result: Result.SUCCESS, post: selectedPost};
      if (selectedPost.postType === PostType.POLL) {
        postRO.post.isVoter = await this.postService.isVoter(params.id, req.session.user.id);
      }
      return postRO;
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Delete(':id')
  async delete(
    @Param() params: PostParams,
    @Req() req: Request): Promise<ResultObject> {
    try {
      const writerId = req.session.user.id;
      if (!(await this.postService.delete(params.id, writerId))) {
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

  @Post(':postId/recruit')
  async toggleRecruit(@Param('postId') postId: number, @Req() req: Request) {
    try {
      const userId = req.session.user.id;
      const recruitStatus = await this.postService.toggleRecruit(postId, userId);
      return {result: Result.SUCCESS, recruitStatus};
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
