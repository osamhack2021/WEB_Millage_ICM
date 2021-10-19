import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlaceEntity} from './place.entity';
import {PlaceController} from './place.controller';
import {PlaceService} from './place.service';
import {ReservationModule} from './reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceEntity]),
    ReservationModule,
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
