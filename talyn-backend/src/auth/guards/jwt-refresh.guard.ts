import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Used only on POST /auth/refresh — separate from the global JwtAuthGuard
// because it validates a different token against a different secret.
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}
