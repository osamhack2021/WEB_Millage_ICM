import {Controller, Get, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';

import {Result} from '../common/common.interface';
import {SchedulesRO} from './schedule.interface';

@ApiBearerAuth()
@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/personal') // validation 필요
  async getUserSchedule(@Req() req: Request): Promise<SchedulesRO> {
    try {
      return {
        result: Result.SUCCESS,
        schedules: await this.scheduleService.getUserSchedule(
            req.session.user.id,
            req.session.user.unit.id,
        ),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Get('/recentUnit')
  async getRecentScheduleForUnit(@Req() req: Request): Promise<SchedulesRO> {
    try {
      return {
        result: Result.SUCCESS,
        schedules: await this.scheduleService.getRecentScheduleForUnit(
            req.session.user.unit.id,
        ),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }
}
