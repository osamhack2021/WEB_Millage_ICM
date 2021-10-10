import {Controller, Get, Post, Req, Body, Patch, Param} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';

import {Result, ResultObject} from '../common/common.interface';
import {SchedulesRO, ScheduleRO} from './schedule.interface';
import {ScheduleService} from './schedule.service';
import {CreateScheduleDto, UpdateScheduleDto} from './dto';

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

  @Post('/create')
  async createNewSchedule(
    @Req() req: Request,
    @Body() dto: CreateScheduleDto,
  ): Promise<ScheduleRO> {
    try {
      const userId = req.session.user.id;
      const unitId = req.session.user.unit.id;

      return {
        result: Result.SUCCESS,
        schedule: await this.scheduleService.create(userId, unitId, dto),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Patch('/update/:id')
  async updateSchedule(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() dto: UpdateScheduleDto
  ): Promise<ResultObject> {
    try {
      const userId = req.session.user.id;
      await this.scheduleService.update(id, userId, dto);
      return {result: Result.SUCCESS};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }
}