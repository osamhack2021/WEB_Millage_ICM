import {UserEntity} from '../user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from 'typeorm';
import {ScheduleEntity} from '../schedule/schedule.entity';
import {PlaceEntity} from '../place/place.entity';


@Entity('unit')
export class UnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    default: false,
  })
  isConfirmed: boolean;

  @OneToMany(() => UserEntity, (user) => user.ownedUnit, {
    onDelete: 'CASCADE',
  })
  admins: UserEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.unitId, {
    onDelete: 'CASCADE',
  })
  schedules: ScheduleEntity[];

  @OneToMany(() => PlaceEntity, (place) => place.unit, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'places',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'}}
  )
  places: PlaceEntity[];
}
