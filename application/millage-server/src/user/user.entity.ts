import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinTable, JoinColumn, OneToMany, ManyToMany, OneToOne, RelationId} from 'typeorm';
import {IsEmail} from 'class-validator';
import * as argon2 from 'argon2';

import {UnitEntity} from '../unit/unit.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';
import {UserPollEntity} from '../post/poll/user_poll.entity';
import {RecruitEntity} from '../post/recruit/recruit.entity';
import {PostEntity} from '../post/post.entity';

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
    select: false,
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
    unique: true,
    nullable: true,
  })
  nickname: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @ManyToOne((type) => UnitEntity)
  @JoinColumn({
    name: 'unitId',
    referencedColumnName: 'id',
  })
  unitId: number;


  @ManyToOne((type) => UnitEntity)
  @JoinTable({
    name: 'unit',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'},
  })
  unit: UnitEntity;

  @ManyToOne((type) => UserRoleEntity)
  @JoinColumn({
    name: 'roleId',
    referencedColumnName: 'id',
  })
  roleId: number;

  @ManyToOne((type) => UserRoleEntity)
  @JoinTable({
    name: 'role',
    joinColumn: {name: 'roleId', referencedColumnName: 'id'},
  })
  role: UserRoleEntity

  @OneToMany(() => UserPollEntity, (userPoll) => userPoll.userId)
  userPolls: UserPollEntity[];

  @ManyToMany(() => RecruitEntity, (recruit) => recruit.currentMember)
  appliedRecruits: RecruitEntity[];

  @OneToMany(() => PostEntity, (post) => post.writer)
  posts: PostEntity[];
}
