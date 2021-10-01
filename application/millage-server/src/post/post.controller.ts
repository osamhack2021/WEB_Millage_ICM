import {Post, Body, Controller} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {PostService} from './post.service';
import {PostRO} from './post.interface';
import {CreatePostDto} from './dto';

@ApiBearerAuth()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async register(@Body() postdata : CreatePostDto): Promise<PostRO> {
    try {
      const postRO = await this.postService.create(postdata);
      return postRO;
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }
}
