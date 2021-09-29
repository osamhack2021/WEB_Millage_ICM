import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UnitEntity} from './unit.entity';

@Injectable()
export class UnitService {
  constructor(
        @InjectRepository(UnitEntity)
        private readonly unitRepository: Repository<UnitEntity>
  ) {}


  async getUnitList(id: number) : Promise<UnitEntity[]> {
    const list = await this.unitRepository.find();
    return list;
  }
}
