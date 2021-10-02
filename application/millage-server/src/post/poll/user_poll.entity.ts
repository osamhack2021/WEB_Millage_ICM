import {Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import {PollItemEntity} from './poll_item.entity';
import {UserEntity} from '../../user/user.entity';

@Entity('userPoll')
export class UserPollEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PollItemEntity, (pollItem) => pollItem.userPolls)
  @JoinColumn({name: 'pollItemId', referencedColumnName: 'id'})
  pollItemIds: number;

  @ManyToOne(() => UserEntity, (user) => user.userPolls)
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  userId: number;
}
