import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PollEntity} from '../poll.entity';

@Entity('pollItem')
export class PollItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PollEntity, (poll) => poll.pollItems)
  poll: PollEntity[];
}
