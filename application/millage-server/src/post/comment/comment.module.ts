import {Module} from '@nestjs/common';
import {CommentController} from './comment.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {CommentService} from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
