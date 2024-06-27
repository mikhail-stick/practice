import { UserRole } from '../../user/user-role.enum';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ApiCookieAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(roles?: UserRole[]) {
  if (roles)
    return applyDecorators(
      Roles(roles),
      ApiCookieAuth(),
      UseGuards(AuthGuard, RolesGuard),
    );
  return applyDecorators(ApiCookieAuth(), UseGuards(AuthGuard));
}
