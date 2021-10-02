import {BoardEntity} from '../board/board.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {PostType} from './post.interface';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, default: PostType.NORMAL})
  postType: PostType;

  @Column({type: 'text'})
  title: string;

  @Column({type: 'text'})
  content: string;

  @Column({type: 'text'})
  imageURL: string;

  @Column({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  createdAt: string;

  @ManyToOne((type) => BoardEntity)
  @JoinColumn({name: 'boardId', referencedColumnName: 'id'})
  boardId: number;
}
