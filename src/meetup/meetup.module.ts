import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './meetup.entity';
import { MeetupService } from './meetup.service';
import { MeetupRepository } from './meetup.repository';
import { MeetupController } from './meetup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Meetup])],
  controllers: [MeetupController],
  providers: [MeetupService, MeetupRepository],
})
export class MeetupModule {}
