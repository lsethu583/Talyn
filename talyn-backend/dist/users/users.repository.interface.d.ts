import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(dto: Pick<CreateUserDto, 'email'> & {
        passwordHash: string;
    }): Promise<User>;
    updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void>;
}
export declare const USER_REPOSITORY: unique symbol;
