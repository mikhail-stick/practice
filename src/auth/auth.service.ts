import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRole } from '../user/user-role.enum';
import * as bcrypt from 'bcrypt';
import { HASH_SALT } from './auth.constants';
import { ServiceError } from '../exceptions/service.error';
import { PrincipalType } from './types/principal.type';
import { normalizeEmail } from 'validator';
import { SignInDto } from './dto/sign-in.dto';
import { AuthError } from '../exceptions/enums/auth-error.enum';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const normalizedEmail = this.normalizeEmailOrFail(signInDto.email);

    const user =
      await this.userService.findOneByNormalizedEmailOrFail(normalizedEmail);

    await this.assertPasswordMatch(user.password, signInDto.password);

    return this.updateTokens(user);
  }

  async assertPasswordMatch(hashedPassword: string, password: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new ServiceError(AuthError.INCORRECT_PASSWORD);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const normalizedEmail = this.normalizeEmailOrFail(signUpDto.email);

    await this.assertUserNotExist(normalizedEmail);

    const hash = await bcrypt.hash(signUpDto.password, HASH_SALT);

    return this.userService.createUser({
      normalizedEmail: normalizedEmail,
      email: signUpDto.email,
      password: hash,
      role: UserRole.User,
      token: null,
    });
  }

  normalizeEmailOrFail(email: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      throw new ServiceError(AuthError.INCORRECT_EMAIL);
    }

    return normalizedEmail;
  }

  async assertUserNotExist(email: string) {
    const isExist = await this.userService.findOneByNormalizedEmail(email);

    if (isExist) {
      throw new ServiceError(AuthError.USER_ALREADY_EXIST);
    }
  }

  async updateTokens(user: User) {
    const payload: PrincipalType = {
      sub: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = await this.accessToken(payload);
    const refreshToken = await this.refreshToken(payload);

    await this.userService.update(user.id, { token: refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshTokens(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneByToken(token);

    return this.updateTokens(user);
  }

  async accessToken(user: PrincipalType) {
    return this.jwtService.signAsync(user);
  }

  async refreshToken(user: PrincipalType) {
    return this.jwtService.signAsync(user, {
      expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_LIFETIME'),
    });
  }
}
