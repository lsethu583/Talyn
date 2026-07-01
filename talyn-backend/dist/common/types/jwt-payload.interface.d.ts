import { Role } from '../constants/roles.enum';
export interface JwtPayload {
    sub: string;
    email: string;
    roles: Role[];
}
export interface AuthenticatedRequestUser extends JwtPayload {
    refreshToken?: string;
}
