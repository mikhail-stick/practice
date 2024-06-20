import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiPropertyOptional({ description: 'label', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  label: string;

  @ApiPropertyOptional({ description: 'meetups', example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  meetups: number[];
}
