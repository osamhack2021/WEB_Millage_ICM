import {UnitEntity} from '../unit/unit.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn,
} from 'typeorm';
import {ReservationEntity} from './reservation/reservation.entity';

@Entity('place')
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  seats: number;

  @ManyToOne(() => UnitEntity)
  @JoinColumn({name: 'unitId', referencedColumnName: 'id'})
  unit: UnitEntity;

  @Column()
  unitId: number;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.place, {
    onDelete: 'CASCADE',
  })
  reservations: ReservationEntity[];
}
