import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'image'})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  url: string;

  @Column({type: 'text'})
  originalName: string;
}
