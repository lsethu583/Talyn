import { CreateUserDto } from '../../users/dto/create-user.dto';

// Reuses CreateUserDto's validation rules so registration rules can never
// drift from the canonical "what is a valid user" definition.
export class RegisterDto extends CreateUserDto {}
