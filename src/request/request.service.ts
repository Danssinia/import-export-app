import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestService {

  constructor(private prismaService:PrismaService){}

  //creating a request
  async create(dto: CreateRequestDto) {
    const request = await this.prismaService.request.create({
      data:{
        userId:dto.userId,
        itemName: dto.itemName,
        itemDescription: dto.itemDescription,
        images: dto.images ?? [],
        price: dto.price,
        //i will check about the status
        status: dto.status
      }
    })

    return {
      request,
      message:"Request Created successfully"
    };
  }


  //fetch all requests and only specific based on condition
  async findAll(requestingUserId:string, role: string) {
    if (role === 'ADMIN'){
      return await this.prismaService.request.findMany({
        include:{user: true}
      })
    }

    //fetching their own request
    return await this.prismaService.request.findMany({
      where:{
        userId: requestingUserId
      },
      include:{user:true}
    })

  }


  //getting a single request
  async findOne(id: string, requestingUserId: string, role: string) {
    //check the existence of the request
    const requestExists = await this.prismaService.request.findUnique({
      where:{
        request_id: id
      },
      include:{user: true}
    })

    if(!requestExists) {
      throw new NotFoundException("Request Not Found")
    }

    if(role !== 'ADMIN' && requestExists.userId!==requestingUserId){
      throw  new ForbiddenException('Access Denied')
    }

    return requestExists;
  }


  //updating the request status (only by the ADMIN)
  async updateStatus(id:string, updateDto: UpdateRequestDto , role: string) {

    //check the existence of the request
    const requestExists = await this.prismaService.request.findUnique({
      where:{
        request_id: id
      }
    })

    if(!requestExists) {
      throw new NotFoundException("Request Not Found")
    }

    if(role === 'ADMIN') {
      return await this.prismaService.request.update({
        where:{request_id:id},
        data:{
          status: updateDto.status
        }
      })
    }

  }

  //updating the request (by the user)
  async update(id: string, dto: UpdateRequestDto) {
    //check the existence of the request
    const requestExists = await this.prismaService.request.findUnique({
      where:{
        request_id: id
      }
    })

    if(!requestExists) {
      throw new NotFoundException("Request Not Found")
    }

    //updating the data
    return await this.prismaService.request.update({
      where:{request_id: id},
      data:{
        itemName:dto.itemName,
        itemDescription:dto.itemDescription,
        price: dto.price,
        images: dto.images ?? []
      }
    })

  }

  //deleting request
  async remove(id: string) {
    //check the existence of the request
    const requestExists = await this.prismaService.request.findUnique({
      where:{
        request_id: id
      }
    })

    if(!requestExists) {
      throw new NotFoundException("Request Not Found")
    }

    if(requestExists.status !== 'ACCEPTED') {
      return await this.prismaService.request.delete({
      where:{request_id:id}
    })
    }
  }
}
