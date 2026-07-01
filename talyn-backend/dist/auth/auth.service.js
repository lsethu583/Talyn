"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const event_emitter_1 = require("@nestjs/event-emitter");
const argon2 = __importStar(require("argon2"));
const users_repository_interface_1 = require("../users/users.repository.interface");
const user_response_dto_1 = require("../users/dto/user-response.dto");
const user_registered_event_1 = require("../events/user-registered.event");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, config, events) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.config = config;
        this.events = events;
    }
    async register(dto) {
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) {
            throw new common_1.UnauthorizedException('An account with this email already exists');
        }
        const passwordHash = await argon2.hash(dto.password);
        const user = await this.userRepository.create({ email: dto.email, passwordHash });
        this.events.emit('user.registered', new user_registered_event_1.UserRegisteredEvent(user.id, user.email, dto.name));
        return new user_response_dto_1.UserResponseDto({ ...user, roles: user.roles });
    }
    async login(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const passwordValid = await argon2.verify(user.passwordHash, dto.password);
        if (!passwordValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const tokens = await this.issueTokens({
            sub: user.id,
            email: user.email,
            roles: user.roles,
        });
        await this.persistRefreshToken(user.id, tokens.refreshToken);
        return { user: new user_response_dto_1.UserResponseDto({ ...user, roles: user.roles }), tokens };
    }
    async refresh(userId, refreshToken) {
        const user = await this.userRepository.findById(userId);
        if (!user || !user.refreshTokenHash)
            throw new common_1.UnauthorizedException('Access denied');
        const matches = await argon2.verify(user.refreshTokenHash, refreshToken);
        if (!matches)
            throw new common_1.UnauthorizedException('Access denied');
        const tokens = await this.issueTokens({
            sub: user.id,
            email: user.email,
            roles: user.roles,
        });
        await this.persistRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        await this.userRepository.updateRefreshTokenHash(userId, null);
    }
    async issueTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.config.get('jwt.accessSecret'),
                expiresIn: this.config.get('jwt.accessExpiresIn'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.config.get('jwt.refreshSecret'),
                expiresIn: this.config.get('jwt.refreshExpiresIn'),
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async persistRefreshToken(userId, refreshToken) {
        const refreshTokenHash = await argon2.hash(refreshToken);
        await this.userRepository.updateRefreshTokenHash(userId, refreshTokenHash);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_repository_interface_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService,
        event_emitter_1.EventEmitter2])
], AuthService);
//# sourceMappingURL=auth.service.js.map