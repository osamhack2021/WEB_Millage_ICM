import {Module} from '@nestjs/common';
import {PostController} from './post.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostEntity} from './post.entity';
import {PostService} from './post.service';
import {PollEntity} from './poll/poll.entity';
import {RecruitEntity} from './recruit/recruit.entity';
import {CommentEntity} from './comment/comment.entity';
import {UserEntity} from '../user/user.entity';
import {CommentModule} from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
        [
          PostEntity,
          PollEntity,
          RecruitEntity,
          CommentEntity,
          UserEntity,
        ]),
    CommentModule,
  ],
  providers: [PostService],
  controllers: [
    PostController,
  ],
  exports: [PostService],
})
export class PostModule {}
