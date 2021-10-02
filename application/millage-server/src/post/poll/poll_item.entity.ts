import {Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PollEntity} from './poll.entity';
import {UserPollEntity} from './user_poll.entity';

@Entity('pollItem')
export class PollItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PollEntity, (poll) => poll.pollItems)
  @JoinColumn({name: 'pollId', referencedColumnName: 'id'})
  pollId: number;

  @OneToMany(() => UserPollEntity, (userPoll) => userPoll.polls)
  @JoinTable({
    name: 'userPoll',
    joinColumn: {
      name: 'userPollId',
      referencedColumnName: 'id',
    },
  })
  userPolls: UserPollEntity[];
}
