import { TradeType } from '@prisma/client';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

}