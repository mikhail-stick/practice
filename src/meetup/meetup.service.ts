import { Injectable } from '@nestjs/common';
import { ServiceError } from '../exceptions/service.error';
import { MeetupRepository } from './meetup.repository';
import { Meetup } from './meetup.entity';
import { MeetupError } from '../exceptions/enums/meetup-error.enum';

@Injectable()
export class MeetupService {
  constructor(private readonly meetupRepository: MeetupRepository) {}

  async create(
    createTagProps: Pick<
      Meetup,
      'name' | 'description' | 'tags' | 'time' | 'location'
    >,
  ) {
    return this.meetupRepository.save(createTagProps);
  }

  async findAll(): Promise<Meetup[]> {
    return this.meetupRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.meetupRepository.findOneBy({ id });

    if (!tag) {
      throw new ServiceError(MeetupError.MEETUP_NOT_FOUND);
    }

    return tag;
  }

  async update(id: number, updateTagProps: Partial<Meetup>) {
    return this.meetupRepository.save({ id, ...updateTagProps });
  }

  async remove(id: number) {
    return this.meetupRepository.delete(id);
  }
}
