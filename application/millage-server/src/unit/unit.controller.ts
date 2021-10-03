import {Controller, Get, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {UnitInfo, UnitListRO} from './unit.interface';
import {UnitService} from './unit.service';
import {Request} from 'express';
import {Result} from '../common/common.interface';

@ApiBearerAuth()
@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @Get('list')
  async getUnitList(@Req() request: Request): Promise<UnitListRO> {
    try {
      const list: UnitInfo[] = await this.unitService.getUnitList();
      return {
        result: Result.SUCCESS,
        units: list,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err,
      };
    }
  }
}
