import {UserEntity} from '../user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from 'typeorm';


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

  @OneToMany(() => UserEntity, (user) => user.ownedUnit)
  admins: UserEntity[];
}
