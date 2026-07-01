import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaUserRepository } from './prisma-user.repository';
import { USER_REPOSITORY } from './users.repository.interface';

@Module({
  providers: [
    UsersService,
    // Binds the interface token to the concrete Prisma implementation.
    // AuthService asks for USER_REPOSITORY, not for Prisma.
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule {}
