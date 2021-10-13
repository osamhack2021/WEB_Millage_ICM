import {Module} from '@nestjs/common';
import {CommentController} from './comment.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {CommentService} from './comment.service';
import {UserEntity} from '../../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
