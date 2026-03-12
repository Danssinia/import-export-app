import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService){}


  //-------Helpers-----------
  private async findUserOrThrow(id: string) {
    const user = await this.prismaService.user.findUnique({
      where:{
        user_id: id
      }
    })
    if(!user){
      throw new NotFoundException("User Not Found");
    }
    return user;
  }

  private async checkOwnership(id:string, targetId:string, role:string) {
    if(role!=="ADMIN" && id !== targetId){
      throw new ForbiddenException("Acess Denied")
    }
  }

  //----------Actions------------


  async findAll() {
      const users = await this.prismaService.user.findMany()
      return users.map(({password,...rest})=>{
        rest
      })

  }

  async findOne(id: string, requestingUser: string, role: string) {
    this.checkOwnership(id,requestingUser,role);
    //check if there is existing user
    const user = await this.findUserOrThrow(id)

    const {password,...safeUser} = user
    return safeUser;

  }

  async update(id: string, dto: UpdateUserDto, requestingUser: string, role:string) {
    this.checkOwnership(id,requestingUser,role)
    //checking existing user
    const user = await this.findUserOrThrow(id)
    //there will be implementation the password is going to be updated for now i just leave it


    const updatedUser = await this.prismaService.user.update({
      where:{
        user_id:id
      },
      data:{
        ...dto
      }
    })

    const {password,...safeUser} =updatedUser
    return safeUser;
  }

  async remove(id: string) {
    await this.findUserOrThrow(id)
    
    return this.prismaService.user.delete({
      where:{user_id:id}
    })
  }


  //below are codes for implementing Admin Roles

  //To Deactivate the user
  async deactivate(id:string) {
    await this.findUserOrThrow(id)

    return await this.prismaService.user.update({
      where:{user_id:id},
      data:{
        isActive:false
      }
    })
  }

  //To Activate the user
  async activate(id: string) {
    await this.findUserOrThrow(id)

    return await this.prismaService.user.update({
      where:{user_id:id},
      data:{
        isActive: true
      }
    })
  }
}
