import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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
}
