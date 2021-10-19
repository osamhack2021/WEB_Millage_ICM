import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Role} from './user_role.interface';


@Entity('user_role')
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: Role;
}
