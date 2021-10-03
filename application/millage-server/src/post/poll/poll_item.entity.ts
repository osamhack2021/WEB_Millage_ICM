import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PostEntity} from '../post.entity';
import {UserPollEntity} from './user_poll.entity';

@Entity('pollItem')
export class PollItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', nullable: false})
  description: string;

  @ManyToOne(() => PostEntity, (post) => post.pollItems)
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  postId: number;

  @OneToMany(() => UserPollEntity, (userPoll) => userPoll.pollItemIds)
  @JoinTable({
    name: 'userPoll',
    joinColumn: {
      name: 'userPollId',
      referencedColumnName: 'id',
    },
  })
  userPolls: UserPollEntity[];
}
