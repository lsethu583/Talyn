import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedRequestUser } from '../common/types/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    private readonly config;
    constructor(authService: AuthService, config: ConfigService);
    register(dto: RegisterDto): Promise<import("../users/dto/user-response.dto").UserResponseDto>;
    login(dto: LoginDto, res: Response): Promise<{
        user: import("../users/dto/user-response.dto").UserResponseDto;
        accessToken: string;
    }>;
    refresh(user: AuthenticatedRequestUser, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(userId: string, res: Response): Promise<{
        message: string;
    }>;
    private setRefreshCookie;
}
