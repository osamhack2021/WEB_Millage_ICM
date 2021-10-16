import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UnitEntity} from './unit.entity';
import {BoardEntity} from '../board/board.entity';
import {UnitDTO, UnitInfo} from './unit.interface';
import {createBasicBoards, getSamplePlace} from './unit.template';
import {PlaceEntity} from '../place/place.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,

    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,

    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
  ) {}


  async getUnitList() : Promise<UnitInfo[]> {
    return await this.unitRepository.query('SELECT unit.id, unit.name, COUNT(*) as count FROM unit INNER JOIN user ON user.unitId=unit.id GROUP BY unit.name order by count desc');
  }

  async getListForSuperAdmin(): Promise<UnitEntity[]> {
    return await this.unitRepository.find({relations: ['admins']}); // need to fix
  }

  async update(id: number, dto: UnitDTO): Promise<boolean> {
    const previousUnit = await this.unitRepository.findOne(id);
    if (previousUnit === undefined) {
      throw new Error(`Cannot find unit by id ${id}`);
    }
    try {
      const changes = this.unitRepository.create(dto);
      if (!(await this.unitRepository.update(id, changes)).affected) {
        return false;
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.unitRepository.delete({
        id: id,
      });

      // add send email

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async create(unitName: string): Promise<UnitEntity> {
    const newUnit = this.unitRepository.create({name: unitName});
    const savedUnit: UnitEntity = await this.unitRepository.save(newUnit);

    const newBoards = createBasicBoards(savedUnit.id, savedUnit.name);
    const newBoardEntities = this.boardRepository.create(newBoards);
    await this.boardRepository.save(newBoardEntities);

    const newPlace = this.placeRepository.create(
        getSamplePlace(savedUnit.id, savedUnit.name));
    await this.placeRepository.save(newPlace);
    
    return savedUnit;
  }
}
