// Permission layer (Phase 1, future-ready).
// Roles map to permissions today; nothing else in the app should hardcode
// role checks like `if (user.role === 'MENTOR')`. Check permissions instead.
export enum Permission {
  MENTOR_CREATE = 'mentor:create',
  MENTOR_UPDATE = 'mentor:update',
  MENTOR_DELETE = 'mentor:delete',
  BOOKING_CREATE = 'booking:create',
  WALLET_VIEW = 'wallet:view',
  WALLET_CREDIT = 'wallet:credit',
  ADMIN_USERS = 'admin:users',
}

import { Role } from './roles.enum';

// The single source of truth for "which roles get which permissions".
// When custom, per-user permissions are needed later, this map becomes the
// default and a per-user override table can be layered on top without
// touching any guard or controller code.
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.USER]: [Permission.BOOKING_CREATE, Permission.WALLET_VIEW],
  [Role.MENTOR]: [
    Permission.MENTOR_UPDATE,
    Permission.BOOKING_CREATE,
    Permission.WALLET_VIEW,
    Permission.WALLET_CREDIT,
  ],
  [Role.EXPERT]: [
    Permission.MENTOR_CREATE,
    Permission.MENTOR_UPDATE,
    Permission.BOOKING_CREATE,
    Permission.WALLET_VIEW,
    Permission.WALLET_CREDIT,
  ],
};
