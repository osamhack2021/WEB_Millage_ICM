import {Module} from '@nestjs/common';
import {BoardController} from './board.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BoardEntity} from './board.entity';
import {BoardService} from './board.service';
import {PostEntity} from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, PostEntity])],
  providers: [BoardService],
  controllers: [
    BoardController,
  ],
  exports: [BoardService],
})
export class BoardModule {}
