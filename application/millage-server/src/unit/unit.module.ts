import {Module} from '@nestjs/common';
import {UnitController} from './unit.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UnitEntity} from './unit.entity';
import {UnitService} from './unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnitEntity])],
  providers: [UnitService],
  controllers: [
    UnitController,
  ],
  exports: [UnitService],
})
export class UnitModule {}
