import {Get, Post, Body, Controller, Param, Delete, Patch, Req, ParseIntPipe} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {PostService} from './post.service';
import {PostRO, PostType} from './post.interface';
import {CreatePostDto, GetPostParams, UpdatePostDto, VoteParams} from './dto';
import {DeleteRO, Result, ResultObject} from '../common/common.interface';
import {Roles} from '../user_role/user_role.decorator';
import {Role} from '../user_role/user_role.interface';
import {UserData} from '../user/user.interface';

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
  @Roles(Role.ADMIN, Role.NORMAL_USER, Role.SUPER_ADMIN)
  async get(@Param() params: GetPostParams, @Req() req: Request): Promise<PostRO> {
    try {
      const userData: UserData = req.session.user;
      const selectedPost = await this.postService.get(params.id, userData);
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

  @Delete(':postId')
  @Roles(Role.ADMIN, Role.NORMAL_USER, Role.SUPER_ADMIN)
  async delete(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: Request): Promise<DeleteRO> {
    try {
      const userData = req.session.user;
      const deletedId = await this.postService.delete(postId, userData);
      return {
        result: Result.FAIL,
        deletedId,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Patch(':postId')
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() postdata: UpdatePostDto,
    @Req() req: Request,
  ): Promise<ResultObject> {
    try {
      const userData: UserData = req.session.user;
      if (await this.postService.update(postId, postdata, userData)) {
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
