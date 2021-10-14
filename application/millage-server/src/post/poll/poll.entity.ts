import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PostEntity} from '../post.entity';
import {UserEntity} from '../../user/user.entity';

@Entity('pollItem')
export class PollEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', nullable: false})
  content: string;

  @ManyToOne(
      () => PostEntity,
      (post) => post.pollItems,
      {onDelete: 'CASCADE'},
  )
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  postId: number;

  @ManyToMany(
      () => UserEntity,
      (user) => user.votes,
      {onDelete: 'CASCADE'},
  )
  @JoinTable({name: 'vote'})
  voters: UserEntity[];
}
