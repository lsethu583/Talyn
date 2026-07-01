import {
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as argon2 from 'argon2';
import { IUserRepository, USER_REPOSITORY } from '../users/users.repository.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthTokens } from './interfaces/tokens.interface';
import { Role } from '../common/constants/roles.enum';
import { JwtPayload } from '../common/types/jwt-payload.interface';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UserRegisteredEvent } from '../events/user-registered.event';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly events: EventEmitter2,
  ) {}

  // Register -> Password Hash (Argon2) -> Store User -> emit UserRegistered event
  async register(dto: RegisterDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new UnauthorizedException('An account with this email already exists');
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.userRepository.create({ email: dto.email, passwordHash });

    // Auth module doesn't know or care who's listening — it just announces
    // the fact. Profile creation, welcome emails, starter coins, etc. are
    // independent listeners that can be added later without touching this file.
    this.events.emit(
      'user.registered',
      new UserRegisteredEvent(user.id, user.email, dto.name),
    );

    return new UserResponseDto({ ...user, roles: user.roles as Role[] });
  }

  // Login -> verify password -> issue access + refresh tokens -> store hashed refresh token
  async login(dto: LoginDto): Promise<{ user: UserResponseDto; tokens: AuthTokens }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.issueTokens({
      sub: user.id,
      email: user.email,
      roles: user.roles as Role[],
    });
    await this.persistRefreshToken(user.id, tokens.refreshToken);

    return { user: new UserResponseDto({ ...user, roles: user.roles as Role[] }), tokens };
  }

  // Validates the incoming refresh token against the *hashed* one stored in
  // the DB (never compare raw tokens) and rotates both tokens.
  async refresh(userId: string, refreshToken: string): Promise<AuthTokens> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshTokenHash) throw new UnauthorizedException('Access denied');

    const matches = await argon2.verify(user.refreshTokenHash, refreshToken);
    if (!matches) throw new UnauthorizedException('Access denied');

    const tokens = await this.issueTokens({
      sub: user.id,
      email: user.email,
      roles: user.roles as Role[],
    });
    await this.persistRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // Logout invalidates the stored refresh token hash so the old cookie
  // (even if leaked) can never be exchanged for new tokens again.
  async logout(userId: string): Promise<void> {
    await this.userRepository.updateRefreshTokenHash(userId, null);
  }

  private async issueTokens(payload: JwtPayload): Promise<AuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('jwt.accessSecret'),
        expiresIn: this.config.get<string>('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('jwt.refreshSecret'),
        expiresIn: this.config.get<string>('jwt.refreshExpiresIn'),
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async persistRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const refreshTokenHash = await argon2.hash(refreshToken);
    await this.userRepository.updateRefreshTokenHash(userId, refreshTokenHash);
  }
}
