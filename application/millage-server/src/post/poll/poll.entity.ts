import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PostEntity} from '../post.entity';
import {PollItemEntity} from './poll_item/poll_item.entity';

@Entity('poll')
export class PollEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PostEntity)
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  postId: number;

  @OneToMany(() => PollItemEntity, (pollItem) => pollItem.poll)
  pollItems: PollItemEntity[];
}

