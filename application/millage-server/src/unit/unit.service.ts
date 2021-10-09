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
    return await this.unitRepository.query('SELECT unit.id, unit.name, COUNT(*) as count FROM unit INNER JOIN user ON user.unitId=unit.id GROUP BY unit.name order by count desc');
  }

  async getListForSuperAdmin(): Promise<UnitEntity[]> {
    return await this.unitRepository.find({relations: ['adminUser']}); // need to fix
  }
}
