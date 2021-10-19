import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import {UserEntity} from '../user/user.entity';

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: false,
    })
    message: string;

    @Column({
      default: false,
      nullable: true,
    })
    anonymous: boolean;

    @Column({
      default: false,
    })
    read: boolean;

    @CreateDateColumn()
    createdAt: string;

    @Column()
    senderId: number;

    @ManyToOne((type) => UserEntity, {onDelete: 'CASCADE'})
    @JoinTable({
      name: 'user',
      joinColumn: {name: 'senderId', referencedColumnName: 'id'},
    })
    sender: UserEntity;

    @Column()
    receiverId: number;

    @ManyToOne((type) => UserEntity, {onDelete: 'CASCADE'})
    @JoinTable({
      name: 'user',
      joinColumn: {name: 'receiverId', referencedColumnName: 'id'},
    })
    receiver: UserEntity;
}
