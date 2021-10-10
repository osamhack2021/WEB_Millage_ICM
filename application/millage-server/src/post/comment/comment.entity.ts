import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, OneToMany} from 'typeorm';
import {PostEntity} from '../post.entity';
import {UserEntity} from '../../user/user.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  content: string;

  @Column({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  createdAt: string;

  @ManyToOne(() => PostEntity)
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  postId: number;

  @ManyToOne(() => UserEntity)
  @JoinTable({
    name: 'writer',
    joinColumn: {name: 'userId', referencedColumnName: 'id'},
  })
  writer: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  userId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.parentCommentId)
  @JoinTable({name: 'reply', joinColumn: {name: 'replyId', referencedColumnName: 'id'}})
  replies: CommentEntity[];

  @ManyToOne(() => CommentEntity, {nullable: true})
  @JoinColumn({name: 'parentCommentId', referencedColumnName: 'id'})
  parentCommentId: number;
}
