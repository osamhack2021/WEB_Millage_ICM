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
    const nineHours = 9 * 60 * 60 * 1000;
    dto.start = new Date(new Date(dto.start).getTime() + nineHours);
    dto.end = dto.end ?
      new Date(new Date(dto.end).getTime() + nineHours) : null;

    const newReservation = this.reservationRepository.create(dto);
    Object.assign(newReservation, {unitId, bookerId});
    return await this.reservationRepository.save(newReservation);
  }

  async delete(reservationId: number, bookerId: number): Promise<number> {
    const reservationToDelete = await this.reservationRepository.findOne(reservationId);
    if (reservationToDelete === undefined) {
      throw new Error(`No reservation exists with id ${reservationId}`);
    }
    if (reservationToDelete.bookerId !== bookerId) {
      throw new Error(`Booker id doesn't match ${bookerId}`);
    }
    const deleteResult = await this.reservationRepository.delete(reservationId);
    if (deleteResult.affected === 0 ) {
      throw new Error('No affected row');
    }
    return reservationId;
  }
}
