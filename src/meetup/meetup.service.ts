import { Injectable } from '@nestjs/common';
import { ServiceError } from '../exceptions/service.error';
import { MeetupRepository } from './meetup.repository';
import { Meetup } from './meetup.entity';
import { MeetupError } from '../exceptions/enums/meetup-error.enum';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { TagService } from '../tag/tag.service';
import { TagError } from '../exceptions/enums/tag-error.enum';
import { QueryMeetupDto } from './dto/query-meetup.dto';
import { FindOptionsOrderValue } from 'typeorm';

@Injectable()
export class MeetupService {
  constructor(
    private readonly tagService: TagService,
    private readonly meetupRepository: MeetupRepository,
  ) {}

  async create(createMeetupDto: CreateMeetupDto) {
    if (createMeetupDto?.tags) {
      for (const id of createMeetupDto?.tags) {
        if (!(await this.tagService.findOne(id))) {
          throw new ServiceError(TagError.TAG_NOT_FOUND);
        }
      }
    }

    const meetup = {
      name: createMeetupDto.name,
      description: createMeetupDto.description,
      tags: createMeetupDto.tags?.map((id) => ({ id })),
      time: createMeetupDto.time,
      location: createMeetupDto.location,
    };

    return this.meetupRepository.save(meetup);
  }

  async findAll(query: QueryMeetupDto): Promise<Meetup[]> {
    const { name, page = 1, size = 5, dateSort } = query;

    return this.meetupRepository.find({
      where: { name },
      relations: { tags: true },
      skip: (page - 1) * size,
      take: size,
      order: {
        time: dateSort as FindOptionsOrderValue,
      },
    });
  }

  async findOne(id: number) {
    const meetup = await this.meetupRepository.find({
      relations: { tags: true },
      where: { id },
    });

    if (!meetup) {
      throw new ServiceError(MeetupError.MEETUP_NOT_FOUND);
    }

    return meetup;
  }

  async update(id: number, updateMeetupDto: UpdateMeetupDto) {
    if (updateMeetupDto?.tags) {
      for (const id of updateMeetupDto?.tags) {
        if (!(await this.tagService.findOne(id))) {
          throw new ServiceError(TagError.TAG_NOT_FOUND);
        }
      }
    }

    const meetup = {
      ...updateMeetupDto,
      time: updateMeetupDto.time?.toISOString(),
      tags: updateMeetupDto.tags?.map((id) => ({ id })),
    };

    return this.meetupRepository.save({ id, ...meetup });
  }

  async remove(id: number) {
    return this.meetupRepository.delete(id);
  }
}
