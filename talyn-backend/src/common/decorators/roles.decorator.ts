import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/roles.enum';

export const ROLES_KEY = 'roles';

// Usage: @Roles(Role.ADMIN) or @Roles(Role.MENTOR, Role.EXPERT)
// Attaches metadata that RolesGuard reads — controllers never branch on
// `user.role === '...'` directly.
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
