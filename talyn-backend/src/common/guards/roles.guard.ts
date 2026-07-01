import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../constants/roles.enum';

// Flow: JwtAuthGuard (authenticated?) -> RolesGuard (correct role?) -> Controller.
// Runs after JwtAuthGuard, so `request.user` is always populated here.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No @Roles() decorator on the route -> any authenticated user is allowed.
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    const hasRole = user?.roles?.some((role: Role) => requiredRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
    return true;
  }
}
