import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from './users.repository.interface';
export declare class PrismaUserRepository implements IUserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(dto: {
        email: string;
        passwordHash: string;
    }): Promise<User>;
    updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void>;
}
