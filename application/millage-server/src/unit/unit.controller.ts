import {Controller, Get} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Roles} from '../user_role/user_role.decorator';
import {Role} from '../user_role/user_role.interface';
import {UnitInfo, UnitListRO} from './unit.interface';
import {UnitService} from './unit.service';
import {Result} from '../common/common.interface';

@ApiBearerAuth()
@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @Get('list')
  async getUnitList(): Promise<UnitListRO> {
    try {
      const list: UnitInfo[] = await this.unitService.getUnitList();
      return {
        result: Result.SUCCESS,
        units: list,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Get('listForSuperAdmin')
  @Roles(Role.SUPER_ADMIN)
  async getListForSuperAdmin() {
    try {
      return {
        result: Result.SUCCESS,
        units: await this.unitService.getListForSuperAdmin(),
      };
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }
}
