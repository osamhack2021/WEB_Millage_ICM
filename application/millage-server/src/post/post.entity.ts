import {BoardEntity} from '../board/board.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable, OneToOne, RelationId, ManyToMany, AfterLoad} from 'typeorm';
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

  @Column({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  createdAt: string;

  @ManyToOne(() => UserEntity)
  @JoinTable({
    name: 'writer',
    joinColumn: {name: 'writerId', referencedColumnName: 'id'},
  })
  writer: UserEntity;

  @RelationId((post: PostEntity) => post.writer)
  writerId: number;

  @ManyToOne(
      () => BoardEntity,
      (board: BoardEntity) => board.posts
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

  @OneToMany(() => ImageEntity, (image) => image.postId)
  images: ImageEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.postId)
  comments: CommentEntity[];

  @OneToOne(
      () => RecruitEntity,
      (recruit) => recruit.post,
      {nullable: true},
  )
  recruitStatus: RecruitEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({name: 'heart'})
  hearts: UserEntity[];

  heartCount: number;

  isVoter?: boolean;

  @AfterLoad()
  countHearts() {
    this.heartCount = this.hearts === undefined ? 0 : this.hearts.length;
  }
}
