import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {PlaceEntity} from './place.entity';
import {CreatePlaceDto, UpdatePlaceDto} from './dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
  ) {}

  async getPlaceListByUnitId(unitId: number): Promise<PlaceEntity[]> {
    return await this.placeRepository.find({
      where: {unitId: unitId},
      relations: ['reservations'],
    });
  }

  async getPlaceWithReservations(placeId: number): Promise<PlaceEntity> {
    return await this.placeRepository.findOne(
        placeId,
        {relations: ['reservations']},
    );
  }

  async create(unitId: number, dto: CreatePlaceDto): Promise<PlaceEntity> {
    const newPlace = this.placeRepository.create(dto);
    newPlace.unitId = unitId;
    return await this.placeRepository.save(newPlace);
  }

  async update(placeId: number, dto: UpdatePlaceDto): Promise<PlaceEntity> {
    const updateResult = await this.placeRepository.update(placeId, dto);
    if (updateResult.affected === 0) {
      throw new Error('No affected row');
    }
    return updateResult.generatedMaps[0] as PlaceEntity;
  }

  async delete(placeId: number): Promise<number> {
    const deleteResult = await this.placeRepository.delete(placeId);
    if (deleteResult.affected === 0) {
      throw new Error('No affected row');
    }
    return placeId;
  }
}
