import {UserEntity} from '../../user/user.entity';
import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn, RelationId} from 'typeorm';
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
      {onDelete: 'CASCADE'})
  @JoinColumn()
  post: PostEntity;

  @RelationId((recruit: RecruitEntity) => recruit.post)
  postId: number;

  @ManyToMany(() => UserEntity, (user) => user.appliedRecruits)
  currentMember: UserEntity[];

  isMember: boolean;
}
