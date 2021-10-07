import {Get, Post, Body, Controller, Param} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {PostService} from './post.service';
import {PostRO} from './post.interface';
import {CreatePostDto, GetPostParams} from './dto';
import {Result} from '../common/common.interface';

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
}
