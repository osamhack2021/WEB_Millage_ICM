import {Controller, Get, Param, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {ResultObject, Result} from '../common/common.interface';

@ApiBearerAuth()
@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':groupId')  // validation 필요
  async getUserSchedule(
    @Req() req: Request,
    @Param('unitId') unitId: number
  ): Promise<ResultObject> {
    try{
      return {
        result: Result.SUCCESS,
        schedule_list: await this.scheduleService.get(req.session.user.id, groupId);
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      }
    }
  }

}
