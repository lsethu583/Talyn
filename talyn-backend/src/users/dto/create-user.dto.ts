import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

// All inbound data is validated against a DTO before it ever reaches a
// service. Nest's global ValidationPipe (whitelist + forbidNonWhitelisted)
// strips/rejects anything not declared here.
export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(72) // argon2/bcrypt practical input limit
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}
