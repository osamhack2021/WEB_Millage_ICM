import {Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import {PollItemEntity} from './poll_item.entity';
import {UserEntity} from 'src/user/user.entity';

@Entity('userPoll')
export class UserPollEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PollItemEntity, (pollItem) => pollItem.userPolls)
  @JoinColumn({name: 'pollItemId', referencedColumnName: 'id'})
  pollItemId: number;

  @ManyToOne(() => UserEntity, (user) => user.userPolls)
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  userId: number;
}
