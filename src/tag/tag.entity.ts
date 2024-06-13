import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Meetup } from '../meetup/meetup.entity';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @ManyToMany(() => Meetup, (meetup) => meetup.tags)
  meetups: Meetup[];
}
