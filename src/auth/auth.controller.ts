import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Principal } from './decorators/principal.decorator';
import { PrincipalType } from './types/principal.type';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { UserRole } from '../user/user-role.enum';
import { Response, Request } from 'express';
import { AuthEnum } from './enums/auth.enum';

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
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { message: AuthEnum.SUCCESSFULLY_LOGGED_IN };
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

  @Post('refresh-tokens')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { message: AuthEnum.SUCCESSFULLY_REFRESHED };
  }

  @Auth()
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');

    return { message: AuthEnum.SUCCESSFULLY_LOGGED_OUT };
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
