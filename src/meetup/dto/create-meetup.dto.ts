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

export class CreateMeetupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsString()
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags: number[];

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  time: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;
}
