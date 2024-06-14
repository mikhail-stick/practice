import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.repository';
import { ServiceError } from '../exceptions/service.error';
import { TagError } from '../exceptions/enums/tag-error.enum';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(createTagProps: Pick<Tag, 'label'>) {
    return this.tagRepository.save(createTagProps);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new ServiceError(TagError.TAG_NOT_FOUND);
    }

    return tag;
  }

  async update(id: number, updateTagProps: Partial<Tag>) {
    return this.tagRepository.save({ id, ...updateTagProps });
  }

  async remove(id: number) {
    return this.tagRepository.delete(id);
  }
}
