import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { IdDto } from '../utils/id.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateMeetupDto } from '../meetup/dto/update-meetup.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateTagDto: UpdateMeetupDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.tagService.remove(id);
  }
}
