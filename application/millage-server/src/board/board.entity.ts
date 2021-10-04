import { PostEntity } from 'src/post/post.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn, OneToMany} from 'typeorm';
import {UnitEntity} from '../unit/unit.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', nullable: false})
  title: string;

  @Column({type: 'text'})
  description: string;

  @Column({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  createdAt: string;

  @Column() // 권한 부여 관련 테이블 설계 필요
  auth: number;

  @Column({type: 'boolean', default: false})
  anonymous: boolean;

  @Column({type: 'boolean', default: false})
  pollAllowed: boolean;

  @Column({type: 'boolean', default: false})
  recruitAllowed: boolean;

  @Column({type: 'boolean', default: false})
  imageAllowed: boolean;

  @ManyToOne(() => UnitEntity)
  @JoinColumn({name: 'unitId', referencedColumnName: 'id'})
  unitId: number;

  @ManyToOne(() => UnitEntity)
  @JoinTable({
    name: 'unit',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'},
  })
  unit: UnitEntity

  @OneToMany(() => PostEntity, (post) => post.boardId)
  posts: PostEntity[];
}
