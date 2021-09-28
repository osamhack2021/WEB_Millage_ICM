import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinTable} from 'typeorm';
import { UnitEntity } from '../unit/unit.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "text"})
  title: string;

  @Column({type: "text"})
  description: string;

  @Column({
    type: "datetime",
    default: ()=>{'CURRENT_TIMESTAMP'},
  })
  createdAt: string;

  @Column()
  auth: number;

  @Column({type: "boolean"})
  anonymous: boolean;

  @ManyToOne((type) => UnitEntity)
  @JoinTable({
    name: 'unit',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'},
  })
  unit: UnitEntity

}
