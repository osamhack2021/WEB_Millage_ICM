import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {ReservationEntity} from './reservation.entity';
import {CreateReservationDto} from './dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async create(
      dto: CreateReservationDto,
      bookerId: number,
      unitId: number,
  ): Promise<ReservationEntity> {
    const newReservation = this.reservationRepository.create(dto);
    Object.assign(newReservation, {unitId, bookerId});
    return await this.reservationRepository.save(newReservation);
  }
}
