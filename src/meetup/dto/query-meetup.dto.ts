import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection } from '../../utils/sort-direction.enum';

export class QueryMeetupDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  size: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsIn([SortDirection.ASC, SortDirection.DESC])
  dateSort: string;
}
