import { UserRole } from '../../user/user-role.enum';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(roles?: UserRole[]) {
  if (roles)
    return applyDecorators(
      Roles(roles),
      ApiBearerAuth(),
      UseGuards(AuthGuard, RolesGuard),
    );
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
}
