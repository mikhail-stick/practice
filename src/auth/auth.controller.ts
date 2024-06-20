import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Principal } from './decorators/principal.decorator';
import { PrincipalType } from './types/principal.type';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { Auth } from './decorators/auth.decorator';
import { UserRole } from '../user/user-role.enum';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully registered',
  })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully registered',
  })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Auth()
  @Get('profile')
  getProfile(@Principal() user: PrincipalType) {
    return user;
  }

  @Auth([UserRole.Admin])
  @Get('admin')
  testEndpoint() {
    return 'Admin';
  }
}
