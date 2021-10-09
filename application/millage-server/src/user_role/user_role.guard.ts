import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

import {ROLES_KEY} from './user_role.decorator';
import {Role} from './user_role.interface';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const {session} = context.switchToHttp().getRequest();
    if (!(session && session.user && session.user.role)) {
      return false;
    }
    return requiredRoles.some((role) => session.user.role.name === role);
  }
}
