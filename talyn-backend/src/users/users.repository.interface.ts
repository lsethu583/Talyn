import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

// AuthService and UsersService depend on this interface, never on Prisma
// directly. Swap the ORM later (Drizzle, TypeORM, raw SQL) by writing a new
// class that implements this interface — zero changes anywhere else.
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(dto: Pick<CreateUserDto, 'email'> & { passwordHash: string }): Promise<User>;
  updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
