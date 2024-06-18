import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const normalizedEmail = this.normalizeEmailOrFail(signInDto.email);

    const user =
      await this.userService.findOneByNormalizedEmailOrFail(normalizedEmail);

    this.assertPasswordMatch(user.password, signInDto.password);

    const payload: PrincipalType = {
      sub: user.id,
      email: user.email,
      role: UserRole[user.role],
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  assertPasswordMatch(hashedPassword: string | Buffer, password: string) {
    const isMatch = bcrypt.compare(hashedPassword, password);
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
}
