import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RequestStatus } from "generated/prisma/enums";

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @IsNotEmpty()
    itemName: string

    @IsString()
    @IsNotEmpty()
    itemDescription: string

    @IsEnum(RequestStatus)
    status: RequestStatus

    @IsString({each:true})
    @IsArray()
    @IsOptional()
    images?: string[]

    @IsString()
    @IsNotEmpty()
    price: string
}
