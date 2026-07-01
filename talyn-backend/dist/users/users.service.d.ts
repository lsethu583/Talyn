import { IUserRepository } from './users.repository.interface';
import { UserResponseDto } from './dto/user-response.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    getById(id: string): Promise<UserResponseDto>;
    assertEmailIsFree(email: string): Promise<void>;
}
