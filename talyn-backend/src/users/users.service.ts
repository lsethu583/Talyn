import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from './users.repository.interface';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async getById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return new UserResponseDto(user);
  }

  async assertEmailIsFree(email: string): Promise<void> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new ConflictException('An account with this email already exists');
  }
}
