import {Module} from '@nestjs/common';
import {PostController} from './post.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostEntity} from './post.entity';
import {PostService} from './post.service';
import {PollItemEntity} from './poll/poll_item.entity';
import {RecruitEntity} from './recruit/recruit.entity';
import {CommentEntity} from './comment/comment.entity';
import {UserEntity} from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PostEntity,
    PollItemEntity,
    RecruitEntity,
    CommentEntity,
    UserEntity,
  ])],
  providers: [PostService],
  controllers: [
    PostController,
  ],
  exports: [PostService],
})
export class PostModule {}
