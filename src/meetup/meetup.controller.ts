import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { IdDto } from '../utils/id.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryMeetupDto } from './dto/query-meetup.dto';

@ApiTags('Meetup')
@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @ApiOperation({ summary: 'Create meetup' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully created',
  })
  @Post()
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupService.create(createMeetupDto);
  }

  @ApiOperation({ summary: 'Get all meetups' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('')
  findAll(@Query() query: QueryMeetupDto) {
    return this.meetupService.findAll(query);
  }

  @ApiOperation({ summary: 'Create meetup by id' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.meetupService.findOne(+id);
  }

  @ApiOperation({ summary: 'Change meetup' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully changed',
  })
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(id, updateMeetupDto);
  }

  @ApiOperation({ summary: 'Delete meetup' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted',
  })
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.meetupService.remove(id);
  }
}
