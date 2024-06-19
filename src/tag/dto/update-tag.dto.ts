import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({ description: 'label', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  label: string;

  @ApiProperty({ description: 'meetups', required: false, example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  meetups: number[];
}
