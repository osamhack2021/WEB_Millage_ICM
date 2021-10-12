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

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinTable({name: 'post', joinColumn: {name: 'postId', referencedColumnName: 'id'}})
  post: PostEntity;

  @Column()
  postId: number;

  @Column({nullable: false})
  isDeleted: boolean;

  @ManyToOne(() => UserEntity)
  @JoinTable({
    name: 'writer',
    joinColumn: {name: 'userId', referencedColumnName: 'id'},
  })
  writer: UserEntity;

  @Column()
  writerId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.parentCommentId)
  replies: CommentEntity[];

  @ManyToOne(
      () => CommentEntity,
      (comment) => comment.replies,
  )
  @JoinColumn({name: 'parentCommentId', referencedColumnName: 'id'})
  parentCommentId?: number;
}
