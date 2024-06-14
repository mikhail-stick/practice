import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Meetup } from './meetup.entity';

@Injectable()
export class MeetupRepository extends Repository<Meetup> {
  constructor(private dataSource: DataSource) {
    super(Meetup, dataSource.createEntityManager());
  }
}
