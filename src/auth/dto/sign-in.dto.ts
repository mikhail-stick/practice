import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'Email', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
