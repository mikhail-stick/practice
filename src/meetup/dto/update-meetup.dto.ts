import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMeetupDto {
  @ApiPropertyOptional({ description: 'name', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiPropertyOptional({ description: 'description', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description: string;

  @ApiPropertyOptional({
    description: 'tags',
    example: [1, 2],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags: number[];

  @ApiPropertyOptional({ description: 'time', required: false })
  @IsOptional()
  @IsNotEmpty()
  @Transform(() => Date)
  time: Date;

  @ApiPropertyOptional({ description: 'location', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  location: string;
}
