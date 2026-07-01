import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// Marks a route as exempt from JwtAuthGuard (e.g. /auth/login, /auth/register).
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
