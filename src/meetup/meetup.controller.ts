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

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Post()
  create(@Body() createMeetupDto) {
    return this.meetupService.create(createMeetupDto);
  }

  @Get()
  findAll() {
    return this.meetupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetupDto) {
    return this.meetupService.update(+id, updateMeetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.meetupService.remove(+id);
  }
}
