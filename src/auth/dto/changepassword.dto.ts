import { IsEmail, IsString, MinLength } from 'class-validator';

export class changePasswordDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  oldpassword: string;

  @IsString()
  @MinLength(6)
  newpassword: string;
  
  @IsString()
  @MinLength(6)
  confirmnewpassword: string;
}