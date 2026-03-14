import { UserRole } from '@prisma/client';
import { IsEmail,IsString, MinLength } from 'class-validator';

export class RegisterDto {
   @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  role:UserRole;
  @IsString()
  address: string;
  @IsString()
  phone: string;


}