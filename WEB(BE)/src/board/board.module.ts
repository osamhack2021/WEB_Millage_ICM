import {Module} from '@nestjs/common';
import {BoardController} from './board.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BoardEntity} from './board.entity';
import {BoardService} from './board.service';
import {PostEntity} from '../post/post.entity';
import {UserEntity} from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, PostEntity, UserEntity])],
  providers: [BoardService],
  controllers: [
    BoardController,
  ],
  exports: [BoardService],
})
export class BoardModule {}
