import {Module} from '@nestjs/common';
import {PostController} from './post.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostEntity} from './post.entity';
import {PostService} from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [
    PostController,
  ],
  exports: [PostService],
})
export class PostModule {}
