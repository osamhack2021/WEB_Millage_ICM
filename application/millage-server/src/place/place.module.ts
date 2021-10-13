import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlaceEntity} from './place.entity';
import {ReservationEntity} from './reservation/reservation.entity';
import {PlaceController} from './place.controller';
import {PlaceService} from './place.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    PlaceEntity,
    ReservationEntity,
  ])],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}