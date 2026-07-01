import { Exclude, Expose } from 'class-transformer';
// import { Role } from '../../common/constants/roles.enum';
import { Role } from '@prisma/client';

// The shape that ever leaves the backend for a User. Notice what's absent:
// passwordHash and refreshTokenHash never appear here, even by accident,
// because this class simply has no fields for them.
@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  roles: Role[];

  @Expose()
  createdAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
