import {UserEntity} from '../../user/user.entity';
import {Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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

  @OneToOne(() => PostEntity, (post) => post.recruitStatus)
  post: PostEntity;

  @ManyToMany(() => UserEntity, (user) => user.appliedRecruits)
  currentMember: UserEntity[];
}
