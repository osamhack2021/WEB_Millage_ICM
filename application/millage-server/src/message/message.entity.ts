import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  JoinColumn} from 'typeorm';
import {UserEntity} from '../user/user.entity';

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: false,
    })
    message: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'senderId', referencedColumnName: 'id' })
    senderId: number;

    @ManyToOne(type => UserEntity)
    @JoinTable({
      name: 'user',
      joinColumn: { name: 'senderId', referencedColumnName: 'id' },
    })
    sender: UserEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'receiverId', referencedColumnName: 'id' })
    receiverId: number;

    @ManyToOne(type => UserEntity)
    @JoinTable({
      name: 'user',
      joinColumn: { name: 'receiverId', referencedColumnName: 'id' },
    })
    receiver: UserEntity;
}