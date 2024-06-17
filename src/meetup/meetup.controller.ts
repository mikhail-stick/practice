import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { IdDto } from '../utils/id.dto';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Post()
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupService.create(createMeetupDto);
  }

  @Get()
  findAll() {
    return this.meetupService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.meetupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(id, updateMeetupDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.meetupService.remove(id);
  }
}
