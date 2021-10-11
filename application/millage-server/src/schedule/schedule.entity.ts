import {UserEntity} from '../user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {UnitEntity} from '../unit/unit.entity';
import {GroupType} from './schedule.interface';


@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  start: Date;

  @Column({nullable: true})
  end?: Date;

  @Column({default: GroupType.PERSON})
  groupType: GroupType;

  @ManyToOne(() => UserEntity)
  userId: number;

  @ManyToOne(() => UnitEntity)
  unitId: number;
}
