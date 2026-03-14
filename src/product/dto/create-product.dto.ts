import { TradeType } from '@prisma/client';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  seller_id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsString()
  category: string;

  //@IsString()
  type: TradeType;

  @IsInt()
  totalCount: number;

  @IsOptional()
  @IsInt()
  soldCount: number;
}