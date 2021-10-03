import {Module} from '@nestjs/common';
import {PostController} from './post.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostEntity} from './post.entity';
import {PostService} from './post.service';
import {PollItemEntity} from './poll/poll_item.entity';
import {UserPollEntity} from './poll/user_poll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PollItemEntity, UserPollEntity])],
  providers: [PostService],
  controllers: [
    PostController,
  ],
  exports: [PostService],
})
export class PostModule {}
