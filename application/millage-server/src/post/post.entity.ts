import {BoardEntity} from '../board/board.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,
  JoinTable, OneToOne, ManyToMany, AfterLoad, CreateDateColumn,
} from 'typeorm';
import {PostType} from './post.interface';
import {UserEntity} from '../user/user.entity';
import {PollEntity} from './poll/poll.entity';
import {ImageEntity} from '../image/image.entity';
import {CommentEntity} from './comment/comment.entity';
import {RecruitEntity} from './recruit/recruit.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, default: PostType.NORMAL})
  postType: PostType;

  @Column({type: 'text'})
  title: string;

  @Column({type: 'text', nullable: true})
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(
      () => UserEntity,
      {onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: 'writer',
    joinColumn: {name: 'writerId', referencedColumnName: 'id'},
  })
  writer: UserEntity;

  @Column({nullable: false})
  writerId: number;

  @ManyToOne(
      () => BoardEntity,
      (board: BoardEntity) => board.posts,
      {onDelete: 'CASCADE'},
  )
  board: BoardEntity;

  @Column()
  boardId: number;

  @OneToMany(
      () => PollEntity,
      (pollItem) => pollItem.postId,
      {nullable: true},
  )
  pollItems: PollEntity[];

  @OneToMany(
      () => ImageEntity,
      (image) => image.postId,
      {nullable: true}
  )
  images: ImageEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToOne(
      () => RecruitEntity,
      (recruit) => recruit.post,
      {nullable: true},
  )
  recruitStatus: RecruitEntity;

  @ManyToMany(() => UserEntity, {onDelete: 'CASCADE'})
  @JoinTable({name: 'heart'})
  hearts: UserEntity[];

  heartUserIds: number[];

  heartCount: number;

  isVoter?: boolean;

  @AfterLoad()
  countHearts() {
    this.heartCount = this.hearts === undefined ? 0 : this.hearts.length;
  }

  @AfterLoad()
  setHeartUserIds() {
    this.heartUserIds = this.hearts != undefined  ? this.hearts.map((user: UserEntity) => user.id) : [];
  }
}
