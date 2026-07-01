import { Role } from '../constants/roles.enum';

// Shape of the data encoded inside both the access and refresh tokens.
export interface JwtPayload {
  sub: string; // user id
  email: string;
  roles: Role[];
}

export interface AuthenticatedRequestUser extends JwtPayload {
  refreshToken?: string; // only present on the refresh-token request flow
}
