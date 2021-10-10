import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async getUserSchedule(userId: number, unitId: number): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find({
      where: [{userId: userId}, {unitId: unitId}],
    });
  }

  async getRecentScheduleForUnit(unitId: number): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find({
      where: {unitId: unitId},
      order: {start: 'DESC'},
    });
  }
}
