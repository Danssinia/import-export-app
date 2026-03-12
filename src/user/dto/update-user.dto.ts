import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    email?: string

    //to be checked again
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string

    @IsString()
    @IsOptional()
    phone?: string

    @IsString()
    @IsOptional()
    address?: string
}
