import {PostEntity} from 'src/post/post.entity';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'image'})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  url: string;

  @ManyToOne(() => PostEntity, (post) => post.images)
  @JoinColumn({name: 'postId', referencedColumnName: 'id'})
  postId: number;
}
