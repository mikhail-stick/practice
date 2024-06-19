import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetupDto {
  @ApiProperty({ description: 'name', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({ description: 'description' })
  @IsString()
  @MaxLength(1024)
  description: string;

  @ApiProperty({ description: 'tags', example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags: number[];

  @ApiProperty({ description: 'time', nullable: false })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  time: Date;

  @ApiProperty({ description: 'location', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;
}
