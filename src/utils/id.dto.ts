import { IsInt, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  readonly id: number;
}
