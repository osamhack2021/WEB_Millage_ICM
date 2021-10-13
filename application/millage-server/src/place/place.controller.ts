import {Get, Controller, Req, Param, Post, Body, Patch, ParseIntPipe} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {PlaceService} from './place.service';
import {PlaceRO, PlaceListRO} from './place.interface';
import {Result} from '../common/common.interface';
import {CreatePlaceDto, UpdatePlaceDto} from './dto';

@ApiBearerAuth()
@ApiTags('place')
@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/place')
  async getPlaceListByUnitId(@Req() req: Request): Promise<PlaceListRO> {
    try {
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        placeList: await this.placeService.getPlaceListByUnitId(unitId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Post('/place')
  async createPlace(
    @Req() req: Request,
    @Body() dto: CreatePlaceDto,
  ): Promise<PlaceRO> {
    try {
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        place: await this.placeService.create(unitId, dto),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Patch('/place/:placeId')
  async updatePlace(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Body() dto: UpdatePlaceDto,
  ): Promise<PlaceRO> {
    try {
      return {
        result: Result.SUCCESS,
        place: await this.placeService.update(placeId, dto),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
