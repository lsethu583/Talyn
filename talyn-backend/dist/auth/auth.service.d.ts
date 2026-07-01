import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUserRepository } from '../users/users.repository.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthTokens } from './interfaces/tokens.interface';
import { UserResponseDto } from '../users/dto/user-response.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly config;
    private readonly events;
    constructor(userRepository: IUserRepository, jwtService: JwtService, config: ConfigService, events: EventEmitter2);
    register(dto: RegisterDto): Promise<UserResponseDto>;
    login(dto: LoginDto): Promise<{
        user: UserResponseDto;
        tokens: AuthTokens;
    }>;
    refresh(userId: string, refreshToken: string): Promise<AuthTokens>;
    logout(userId: string): Promise<void>;
    private issueTokens;
    private persistRefreshToken;
}
