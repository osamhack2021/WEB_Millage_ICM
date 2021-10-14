import {UserEntity} from '../../user/user.entity';
import {
  Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import {PostEntity} from '../post.entity';
import {RecruitStatus} from './recruit.interface';

@Entity('recruit')
export class RecruitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: RecruitStatus.PROGRESS})
  status: RecruitStatus;

  @Column()
  totalMember: number;

  @OneToOne(
      () => PostEntity,
      (post) => post.recruitStatus,
      {onDelete: 'CASCADE', nullable: true})
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  post: PostEntity;

  @Column()
  postId: number;

  @ManyToMany(() => UserEntity, (user) => user.appliedRecruits)
  currentMember: UserEntity[];

  isMember: boolean;
}
