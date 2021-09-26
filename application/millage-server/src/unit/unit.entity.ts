import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity('unit')
export class UnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;
}
