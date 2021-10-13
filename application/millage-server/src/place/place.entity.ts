import {UnitEntity} from '../unit/unit.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,
  JoinTable, OneToOne, RelationId, ManyToMany, AfterLoad,
} from 'typeorm';

@Entity('place')
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  seats: number;

  @ManyToOne(() => UnitEntity, (unit) => unit.places)
  unit: UnitEntity;

  @Column()
  unitId: number;
}
