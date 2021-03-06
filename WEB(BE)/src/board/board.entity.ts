import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable,
  OneToMany, CreateDateColumn, ManyToMany,
} from 'typeorm';

import {UnitEntity} from '../unit/unit.entity';
import {PostEntity} from '../post/post.entity';
import {PaginationObject, AuthType} from './board.interface';
import {UserEntity} from '../user/user.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', nullable: false})
  title: string;

  @Column({type: 'text'})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({default: AuthType.ALL})
  auth: AuthType;

  @Column({type: 'boolean', default: false})
  anonymous: boolean;

  @Column({type: 'boolean', default: false})
  pollAllowed: boolean;

  @Column({type: 'boolean', default: false})
  recruitAllowed: boolean;

  @Column({type: 'boolean', default: false})
  imageAllowed: boolean;

  @ManyToOne(
      () => UnitEntity,
      {onDelete: 'CASCADE'},
  )
  @JoinTable({
    name: 'unit',
    joinColumn: {name: 'unitId', referencedColumnName: 'id'},
  })
  unit: UnitEntity

  @Column()
  unitId: number;

  @OneToMany(() => PostEntity, (post) => post.board)
  posts: PostEntity[];

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.starredBoards)
  staringUsers: UserEntity[];

  paginationObject: PaginationObject<PostEntity>;

  isStarred: boolean;
}
