import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinTable} from 'typeorm';
import {IsEmail, IsMobilePhone} from 'class-validator';
import * as argon2 from 'argon2';
import {UnitEntity} from '../unit/unit.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @IsEmail()
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phonenumber: string;

  @Column()
  fullname: string;

  @Column()
  auth: number;

  @Column({
    nullable: true,
  })
  nickname: string;

  @Column({
    nullable: true,
  })
  unitId: number;

  @BeforeInsert()
  async hashPassword() {
    // this.password = await argon2.hash(this.password);
  }

  @ManyToOne((type) => UnitEntity)
  @JoinTable({
    name: 'unit',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'},
  })
  unit: UnitEntity
}
