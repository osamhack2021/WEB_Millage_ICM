import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserData} from '../user/user.interface';
import {Role} from '../user_role/user_role.interface';
import {Repository} from 'typeorm';
import {CreateScheduleDto, UpdateScheduleDto} from './dto';

import {ScheduleEntity} from './schedule.entity';
import {GroupType} from './schedule.interface';
import {UserEntity} from '../user/user.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';

const RECENT_SCHEDULE_COUNT = 5;

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async getUserSchedule(userData: UserData): Promise<ScheduleEntity[]> {
    const superAdmin = await this.userRoleRepository.findOne({where: {name: Role.SUPER_ADMIN}});
    const superAdminUser = await this.userRepository.findOne({where: {roleId: superAdmin.id}});
    return this.scheduleRepository.find({
      where: [
        {userId: userData.id},
        {unitId: userData.unit.id, groupType: GroupType.UNIT},
        {userId: superAdminUser.id, groupType: GroupType.UNIT}, // 최고관리자가 관리 가능
      ],
    });
  }

  async getRecentScheduleForUnit(unitId: number): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find({
      where: {unitId: unitId},
      order: {start: 'DESC'},
      take: RECENT_SCHEDULE_COUNT,
    });
  }

  async create(
      dto: CreateScheduleDto,
      userData: UserData,
  ): Promise<ScheduleEntity> {
    const groupType = userData.role.name === Role.NORMAL_USER ?
      GroupType.PERSON : GroupType.UNIT;
    const nineHours = 9 * 60 * 60 * 1000;
    dto.start = new Date(new Date(dto.start).getTime() + nineHours);
    dto.end = dto.end ?
      new Date(new Date(dto.end).getTime() + nineHours) : null;
    Object.assign(dto,
        {userId: userData.id, unitId: userData.unit.id, groupType});
    const newSchedule = this.scheduleRepository.create(dto);
    return this.scheduleRepository.save(newSchedule);
  }

  async update(
      id: number,
      userId: number,
      dto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    const scheduleToUpdate = await this.scheduleRepository.findOne(id, {relations: ['userId']});
    if (userId !== scheduleToUpdate.userId.id) {
      throw new Error('Not authorized user');
    }
    Object.assign(dto, {userId});
    const nineHours = 9 * 60 * 60 * 1000;
    dto.start = new Date(new Date(dto.start).getTime() + nineHours);
    dto.end = dto.end ?
      new Date(new Date(dto.end).getTime() + nineHours) : null;

    const editedSchedule = this.scheduleRepository.create(dto);
    const updateResult = await this.scheduleRepository.update(id, editedSchedule);
    return updateResult.generatedMaps[0] as ScheduleEntity;
  }

  async delete(id: number, userData: UserData): Promise<boolean> {
    const scheduleToDelete = await this.scheduleRepository.findOne(id, {relations: ['userId']});
    if (userData.id !== scheduleToDelete.userId.id) {
      throw new Error('Not Authorized user');
    }
    await this.scheduleRepository.delete(id);
    return true;
  }

  async getRecentScheduleMixed(id: number, unitId: number): Promise<ScheduleEntity[]> {
    const schedules = await this.scheduleRepository.query(`
    (select * from schedule where userIdId=${id} and groupType='person' and
    ((schedule.start >= CURRENT_DATE and schedule.end IS NULL) or
    (schedule.end >= CURRENT_DATE))
  )
  union
  (
  select * from schedule where unitIdId=${unitId} and groupType='unit' and
    ((schedule.start >= CURRENT_DATE and schedule.end IS NULL) or
    (schedule.end >= CURRENT_DATE))
  )
  order by start asc limit 5
    `);
    return schedules;
  }
}
