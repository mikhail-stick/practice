import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { IdDto } from '../utils/id.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateMeetupDto } from '../meetup/dto/update-meetup.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: 'Create tag' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully created',
  })
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @ApiOperation({ summary: 'Get tag by id' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.tagService.findOne(id);
  }

  @ApiOperation({ summary: 'Change tag' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully changed',
  })
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateTagDto: UpdateMeetupDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: 'Delete tag' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted',
  })
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.tagService.remove(id);
  }
}
