import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne} from 'typeorm';
import {IsEmail} from 'class-validator';
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

  @Column({
    nullable: true,
  })
  nickname: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @ManyToOne(type => UnitEntity)
  unit: UnitEntity
  
}
