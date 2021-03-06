import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany, CreateDateColumn, ManyToMany, AfterLoad, EventSubscriber, EntitySubscriberInterface} from 'typeorm';
import {PostEntity} from '../post.entity';
import {UserEntity} from '../../user/user.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(
      () => PostEntity,
      (post) => post.comments,
      {onDelete: 'CASCADE'}
  )
  @JoinTable({name: 'post', joinColumn: {name: 'postId', referencedColumnName: 'id'}})
  post: PostEntity;

  @Column()
  postId: number;

  @Column({nullable: false, default: false})
  isDeleted: boolean;

  @ManyToOne(
      () => UserEntity,
      {onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: 'writer',
    joinColumn: {name: 'writerId', referencedColumnName: 'id'},
  })
  writer: UserEntity;

  @Column()
  writerId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.parentCommentId)
  replies: CommentEntity[];

  @ManyToOne(
      () => CommentEntity,
      (comment) => comment.replies,
      {onDelete: 'CASCADE', nullable: true},
  )
  parentComment: CommentEntity;

  @Column({nullable: true})
  parentCommentId?: number;

  @ManyToMany(() => UserEntity)
  @JoinTable({name: 'commentHeart'})
  hearts: UserEntity[];
  liked?: boolean;
  heartCount: number;

  @AfterLoad()
  countHearts() {
    this.heartCount = this.hearts === undefined ? 0 : this.hearts.length;
  }
}

@EventSubscriber()
export class CommentSubscriber
implements EntitySubscriberInterface<CommentEntity> {
  listenTo() {
    return CommentEntity;
  }
}
