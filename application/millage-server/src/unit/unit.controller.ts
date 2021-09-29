import {Controller, Get, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {UnitListRO} from './unit.interface';
import {UnitService} from './unit.service';
import {Request} from 'express';
import {UnitEntity} from './unit.entity';

@ApiBearerAuth()
@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @Get('list')
  async getUnitList(@Req() request: Request): Promise<UnitListRO> {
    try {
      const list: UnitEntity[] = await this.unitService.getUnitList(request.session.user.unit.id);
      return {
        result: 'success',
        units: list,
      };
    } catch (err) {
      return {
        result: 'error',
        message: err,
      };
    }
  }
}
