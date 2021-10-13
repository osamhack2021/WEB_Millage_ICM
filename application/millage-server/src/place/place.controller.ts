import {Get, Post, Body, Controller, Param, Delete, Patch, Req} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {PlaceService} from './place.service';
import {PlaceRO} from './place.interface';
import {Result} from '../common/common.interface';

@ApiBearerAuth()
@ApiTags('place')
@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/place')
  async getAllPlace(@Req() req: Request): Promise<PlaceRO> {
    try {
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        places: await this.placeService.getAllPlace(unitId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
