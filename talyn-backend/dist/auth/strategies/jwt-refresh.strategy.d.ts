import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../../common/types/jwt-payload.interface';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor(config: ConfigService);
    validate(req: Request, payload: JwtPayload): {
        refreshToken: any;
        sub: string;
        email: string;
        roles: import("../../common/constants/roles.enum").Role[];
    };
}
export {};
