import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetupDto {
  @ApiProperty({ description: 'name', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({ description: 'description', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description: string;

  @ApiProperty({ description: 'tags', example: [1, 2], required: false })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags: number[];

  @ApiProperty({ description: 'time', required: false })
  @IsOptional()
  @IsNotEmpty()
  @Transform(() => Date)
  time: Date;

  @ApiProperty({ description: 'location', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  location: string;
}
