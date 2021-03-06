import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinTable,
  OneToMany, ManyToMany, BeforeUpdate,
} from 'typeorm';
import {IsEmail} from 'class-validator';
import * as argon2 from 'argon2';

import {UnitEntity} from '../unit/unit.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';
import {RecruitEntity} from '../post/recruit/recruit.entity';
import {PostEntity} from '../post/post.entity';
import {PollEntity} from '../post/poll/poll.entity';
import {ScheduleEntity} from '../schedule/schedule.entity';
import {CommentEntity} from '../post/comment/comment.entity';
import {ReservationEntity} from '../place/reservation/reservation.entity';
import {BoardEntity} from '../board/board.entity';

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

  @Column({default: false})
  isConfirmed: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @BeforeUpdate()
  async hashPassword2() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  @ManyToOne(() => UnitEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'unit',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'},
  })
  unit: UnitEntity;

  @Column({nullable: true})
  unitId: number;

  @ManyToOne(() => UserRoleEntity)
  @JoinTable({
    name: 'role',
    joinColumn: {name: 'roleId', referencedColumnName: 'id'},
  })
  role: UserRoleEntity

  @Column()
  roleId: number;

  @ManyToOne(() => UnitEntity, (unit) => unit.admins, {
    onDelete: 'CASCADE',
  })
  @JoinTable({name: 'ownedUnit', joinColumn: {name: 'ownedUnitId', referencedColumnName: 'id'}})
  ownedUnit: UnitEntity[];

  @Column({nullable: true})
  ownedUnitId: number;

  @ManyToMany(() => RecruitEntity, (recruit) => recruit.currentMember, {onDelete: 'CASCADE'})
  @JoinTable({name: 'recruitingUser'})
  appliedRecruits: RecruitEntity[];

  @OneToMany(() => PostEntity, (post) => post.writer)
  posts: PostEntity[];

  @ManyToMany(() => PostEntity, {onDelete: 'CASCADE'})
  likedPosts: PostEntity[];

  @ManyToMany(() => CommentEntity, {onDelete: 'CASCADE'})
  likedComments: CommentEntity[];

  @ManyToMany(() => PollEntity, (pollItem) => pollItem.voters, {onDelete: 'CASCADE'})
  votes: PollEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.userId)
  schedules: ScheduleEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.booker, {
    onDelete: 'CASCADE',
  })
  reservations: ReservationEntity[];

  @ManyToMany(() => BoardEntity, (board: BoardEntity) => board.staringUsers, {onDelete: 'CASCADE'})
  @JoinTable({name: 'starredBoards'})
  starredBoards: BoardEntity[];
}
