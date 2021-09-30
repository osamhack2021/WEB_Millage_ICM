import {Module} from '@nestjs/common';
import {BoardController} from './board.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BoardEntity} from './board.entity';
import {BoardService} from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardService],
  controllers: [
    BoardController,
  ],
  exports: [BoardService],
})
export class BoardModule {}
