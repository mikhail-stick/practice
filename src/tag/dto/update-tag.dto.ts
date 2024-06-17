import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  label: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  meetups: number[];
}
