import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity('user_role')
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  role: string;
}
