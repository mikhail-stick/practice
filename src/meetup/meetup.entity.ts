import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Entity({ name: 'meetup' })
export class Meetup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Tag, (tag) => tag.meetups)
  @JoinTable()
  tags: Tag[];

  @Column({ type: 'timestamp with time zone' })
  time: Date;

  @Column('varchar', { length: 256 })
  location: string;
}
