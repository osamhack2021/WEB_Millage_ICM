import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ReservationEntity} from './reservation.entity';
import {ReservationService} from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
