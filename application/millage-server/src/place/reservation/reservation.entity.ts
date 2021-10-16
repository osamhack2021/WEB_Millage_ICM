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

  @Column({type: 'text'})
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    default: 1,
  })
  total: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'bookerId', referencedColumnName: 'id'})
  booker: UserEntity;

  @Column()
  bookerId: number;

  @ManyToOne(() => UnitEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'unitId', referencedColumnName: 'id'})
  unit: UnitEntity;

  @Column()
  unitId: number;

  @ManyToOne(() => PlaceEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'placeId', referencedColumnName: 'id'})
  place: PlaceEntity;

  @Column()
  placeId: number;
}
