import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PostEntity} from '../post/post.entity';

@Entity({name: 'image'})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  url: string;

  @Column({type: 'text'})
  originalName: string;

  @ManyToOne(() => PostEntity)
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  postId: number;
}
