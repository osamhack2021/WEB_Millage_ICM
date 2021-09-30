import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UnitEntity} from './unit.entity';
import {UnitInfo} from './unit.interface';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}


  async getUnitList() : Promise<UnitInfo[]> {
    return await this.unitRepository.query('SELECT name,COUNT(*) as count FROM unit INNER JOIN user ON user.unitId=unit.id GROUP BY unit.name');
  }
}
