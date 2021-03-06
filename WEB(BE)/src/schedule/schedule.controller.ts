import {Controller, Get, Post, Req, Body, Patch, Param, ParseIntPipe, Delete} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';

import {Result, ResultObject} from '../common/common.interface';
import {SchedulesRO, ScheduleRO} from './schedule.interface';
import {ScheduleService} from './schedule.service';
import {CreateScheduleDto, UpdateScheduleDto} from './dto';
import {UserData} from '../user/user.interface';
import {Role} from '../user_role/user_role.interface';
import {Roles} from '../user_role/user_role.decorator';

@ApiBearerAuth()
@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/recentMixed')
  async getRecentScheduleMixed(@Req() req: Request) : Promise<SchedulesRO> {
    try {
      return {
        result: Result.SUCCESS,
        schedules: await this.scheduleService.getRecentScheduleMixed(+req.session.user.id, +req.session.user.unit.id),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Get('/personal') // validation 필요
  async getUserSchedule(@Req() req: Request): Promise<SchedulesRO> {
    try {
      const userData: UserData = req.session.user;
      return {
        result: Result.SUCCESS,
        schedules: await this.scheduleService.getUserSchedule(userData),
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

  @Post('/')
  async createNewSchedule(
    @Req() req: Request,
    @Body() dto: CreateScheduleDto,
  ): Promise<ScheduleRO> {
    try {
      const userData: UserData = req.session.user;
      return {
        result: Result.SUCCESS,
        schedule: await this.scheduleService.create(dto, userData),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.NORMAL_USER)
  async updateSchedule(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateScheduleDto
  ): Promise<ScheduleRO> {
    try {
      const userId = req.session.user.id;
      return {
        result: Result.SUCCESS,
        schedule: await this.scheduleService.update(id, userId, dto),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.NORMAL_USER)
  async deleteSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<ResultObject> {
    try {
      const userData: UserData = req.session.user;
      await this.scheduleService.delete(id, userData);
      return {result: Result.SUCCESS};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }
}
