import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ description: 'label', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  label: string;

  @ApiProperty({ description: 'meetups', example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  meetups: number[];
}
