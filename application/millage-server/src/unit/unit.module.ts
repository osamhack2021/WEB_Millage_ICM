import {Module} from '@nestjs/common';
import {UnitController} from './unit.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UnitEntity} from './unit.entity';
import {UnitService} from './unit.service';
import {BoardModule} from '../board/board.module';
import {BoardEntity} from '../board/board.entity';
import {PlaceEntity} from '../place/place.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitEntity, BoardEntity, PlaceEntity]),
    BoardModule,
  ],
  providers: [UnitService],
  controllers: [
    UnitController,
  ],
  exports: [UnitService],
})
export class UnitModule {}
