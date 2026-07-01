# Mentor Platform — Phase 1 (Auth & Shared Foundation)

A NestJS + Prisma backend implementing the auth/RBAC/foundation layer described
in the Phase 1 plan. Every future module (Mentors, Wallet, Bookings, Reviews)
is meant to depend on `common/`, `database/`, and `users/` without modifying them.

## Setup
```bash
npm install
cp .env.example .env        # then fill in real secrets
npx prisma migrate dev      # creates the database schema
npm run start:dev
```

## What's implemented
- JWT access (15m) + refresh (7d) tokens, refresh token stored as an httpOnly cookie
- Argon2 password hashing, refresh tokens are hashed before being stored (never raw)
- Global `ValidationPipe` (whitelist, forbidNonWhitelisted, transform)
- RBAC via `@Roles()` decorator + `JwtAuthGuard` -> `RolesGuard` chain, applied globally
- Permission map (`common/constants/permissions.ts`) ready for per-user overrides later
- Global exception filter — every error returns `{ success, message, code, timestamp, path }`
- Global response interceptor — every success returns `{ success, data, timestamp }`
- Helmet, CORS locked to `FRONTEND_URL`, rate limiting (global + tighter on auth routes)
- Repository interface (`IUserRepository`) so Prisma can be swapped later
- Event-driven registration: `user.registered` fans out to profile creation,
  welcome notification, and starter-coins listeners independently

## Folder structure
```
src/
├── auth/            # login, register, refresh, logout, JWT strategies
├── users/           # user lookups, repository interface + Prisma impl
├── profiles/         # placeholder module for Phase 2
├── events/          # user.registered listeners
├── database/        # PrismaService (global module)
├── common/          # guards, decorators, filters, interceptors, constants, types
└── config/          # typed config + startup env validation
```

## Endpoints
| Method | Path           | Auth        | Notes                              |
|--------|----------------|-------------|-------------------------------------|
| POST   | /auth/register | Public      | 5 req/min                           |
| POST   | /auth/login    | Public      | 5 req/min, sets refresh cookie      |
| POST   | /auth/refresh  | Refresh JWT | Reads `refresh_token` httpOnly cookie |
| POST   | /auth/logout   | Access JWT  | Invalidates stored refresh hash     |

## Next (Phase 2+)
Mentor, Wallet, Booking, Review modules — each adds its own controller/service/DTOs
and reuses `JwtAuthGuard`, `RolesGuard`, `@Roles()`, `GlobalExceptionFilter`, and
`PrismaService` as-is.
