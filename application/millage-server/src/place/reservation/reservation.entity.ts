import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne,
} from 'typeorm';
import {UserEntity} from '../../user/user.entity';
import {UnitEntity} from '../../unit/unit.entity';
import {PlaceEntity} from '../place.entity';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'bookerId', referencedColumnName: 'id'})
  booker: UserEntity;

  @Column()
  bookerId: number;

  @ManyToOne(() => UnitEntity)
  @JoinColumn({name: 'unitId', referencedColumnName: 'id'})
  unit: UnitEntity;

  @Column()
  unitId: number;

  @ManyToOne(() => PlaceEntity)
  @JoinColumn({name: 'placeId', referencedColumnName: 'id'})
  place: PlaceEntity;

  @Column()
  placeId: number;
}
