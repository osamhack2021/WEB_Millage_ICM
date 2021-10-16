import {Get, Controller, Req, Param, Post, Delete, Body, Patch, ParseIntPipe} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';
import {PlaceService} from './place.service';
import {ReservationService} from './reservation/reservation.service';
import {PlaceRO, PlaceListRO} from './place.interface';
import {ReservationRO} from './reservation/reservation.interface';
import {Result, DeleteRO} from '../common/common.interface';
import {CreatePlaceDto, UpdatePlaceDto} from './dto';
import {CreateReservationDto} from './reservation/dto';

@ApiBearerAuth()
@ApiTags('place')
@Controller()
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly reservationService: ReservationService,
  ) {}

  @Get('/place')
  async getPlaceListByUnitId(@Req() req: Request): Promise<PlaceListRO> {
    try {
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        places: await this.placeService.getPlaceListByUnitId(unitId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Get('/place/:placeId')
  async getPlaceById(
    @Param('placeId', ParseIntPipe) placeId: number,
  ): Promise<PlaceRO> {
    try {
      return {
        result: Result.SUCCESS,
        place: await this.placeService.getPlaceWithReservations(placeId),
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

  @Delete('/place/:placeId')
  async deletePlace(
    @Param('placeId', ParseIntPipe) placeId: number,
  ): Promise<DeleteRO> {
    try {
      return {
        result: Result.SUCCESS,
        deletedId: await this.placeService.delete(placeId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  // RESERVATION FEATURES
  @Post('/reservation')
  async createReservation(
    @Req() req: Request,
    @Body() dto: CreateReservationDto,
  ): Promise<ReservationRO> {
    try {
      const bookerId = req.session.user.id;
      const unitId = req.session.user.unit.id;
      return {
        result: Result.SUCCESS,
        reservation: await this.reservationService.create(dto, bookerId, unitId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Delete('/reservation/:reservationId')
  async deleteReservation(
    @Req() req: Request,
    @Param('reservationId', ParseIntPipe) reservationId: number,
  ): Promise<DeleteRO> {
    try {
      const bookerId = req.session.user.id;
      return {
        result: Result.SUCCESS,
        deletedId: await this.reservationService.delete(reservationId, bookerId),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
