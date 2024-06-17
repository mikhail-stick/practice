import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.repository';
import { ServiceError } from '../exceptions/service.error';
import { TagError } from '../exceptions/enums/tag-error.enum';
import { UpdateMeetupDto } from '../meetup/dto/update-meetup.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(createTagDto: CreateTagDto) {
    const tag = {
      label: createTagDto.label,
      tags: createTagDto.meetups?.map((id) => ({ id })),
    };

    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new ServiceError(TagError.TAG_NOT_FOUND);
    }

    return tag;
  }

  async update(id: number, updateTagProps: UpdateMeetupDto) {
    return this.tagRepository.save({
      id,
      ...updateTagProps,
    });
  }

  async remove(id: number) {
    return this.tagRepository.delete(id);
  }
}
