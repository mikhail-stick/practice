import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TagRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }
}
