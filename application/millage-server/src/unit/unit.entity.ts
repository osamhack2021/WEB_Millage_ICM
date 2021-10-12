import {UserEntity} from '../user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {ScheduleEntity} from '../schedule/schedule.entity';


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
}
