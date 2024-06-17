import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMeetupDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags: number[];

  @IsOptional()
  @IsNotEmpty()
  @Transform(() => Date)
  time: Date;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  location: string;
}
