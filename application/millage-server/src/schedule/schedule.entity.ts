import {UserEntity} from '../user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {UnitEntity} from '../unit/unit.entity';


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

  @ManyToOne(() => UserEntity)
  userId: number;

  @ManyToOne(() => UnitEntity)
  unitId: number;
}
