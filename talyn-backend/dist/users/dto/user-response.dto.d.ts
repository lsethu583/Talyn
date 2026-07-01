import { Role } from '@prisma/client';
export declare class UserResponseDto {
    id: string;
    email: string;
    roles: Role[];
    createdAt: Date;
    constructor(partial: Partial<UserResponseDto>);
}
