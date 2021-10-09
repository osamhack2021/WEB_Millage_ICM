import {UserEntity} from '../user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn} from 'typeorm';


@Entity('unit')
export class UnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    default: false,
  })
  isConfirmed: boolean;

  @OneToOne(() => UserEntity, (user) => user.ownedUnitId)
  @JoinColumn({
    name: 'adminUserId',
    referencedColumnName: 'id',
  })
  adminUserId: number;

  @OneToOne(() => UserEntity, (user) => user.ownedUnit)
  @JoinTable({
    name: 'adminUser',
    joinColumn: {name: 'userId', referencedColumnName: 'id'},
  })
  adminUser: UserEntity;
}
