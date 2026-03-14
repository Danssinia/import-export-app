import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto:RegisterDto) {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({ where: {email: dto.email } });
      if (existingUser) {
       return{error:"Email already exists!"};// throw new ConflictException('Email already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create user
      const user = await this.prisma.user.create({
        data: {email: dto.email, password: hashedPassword ,name:dto.name,
          address:dto.address,phone:dto.phone},
      });

      // Create JWT payload
      const payload = { sub: user.user_id, name: user.name };
      const token = this.jwtService.sign(payload);

      return {
        user: { id: user.user_id, name: user.name },
        access_token: token,
      };
    } catch (error) {
      // Handle known Prisma errors (e.g., unique constraint violation)
      if (error.code === 'P2002') {
       return{error:"unique constraint violation error occured"};//  throw new ConflictException('Email already exists');
      } 

      // Fallback for unexpected errors
     return{error:"unexpected error occured!"+error};
    }

  }
    async login(dto:{email: string, password: string}) {
     try {
      
//check if user exists
      const existingUser = await this.prisma.user.findUnique({ where: {email: dto.email } });
      if (!existingUser) {
       return{error:"Email NOT exists!"};// throw new ConflictException('Email already registered');
      }

if(!await bcrypt.compare(dto.password, existingUser.password)){
  return{error:"Incorrect password!"};
}

      // Create JWT payload
      const payload = { sub: existingUser.user_id, name: existingUser.name };
      const token = this.jwtService.sign(payload);

      return {
        user: { id: existingUser.user_id, name: existingUser.name },
        access_token: token,
      };
    

     
    } catch (error) {
     return{error:"unexpected error occured!"};
    }
  

  }
  async changepassword(dto:{email:string,oldpassword: string, newpassword: string,confirmnewpassword: string}) {
    try {
      
//check if user exists
      const existingUser = await this.prisma.user.findUnique({ where: {email: dto.email } });
      if (!existingUser) {
       return{error:"Email NOT exists!"};// throw new ConflictException('Email already registered');
      }
//check if password is confirmed

      if (dto.newpassword!=dto.confirmnewpassword) {
       return{error:"Password confirmation error!"};
       }
     //hash old password
     const hashedOldPassword = await bcrypt.hash(dto.oldpassword, 10);
     //get database password
     const dbpassword=existingUser.password;
//compare stored and entered passwords
if(!await bcrypt.compare(dto.oldpassword, existingUser.password)){
  return{error:"Incorrect password!"};
}


      // Hash newpassword
      const hashedNewPassword = await bcrypt.hash(dto.newpassword, 10);
//change password
 return this.prisma.user.update({
      where: { email:dto.email },
      data:{password:hashedNewPassword}
    });
    

     
    } catch (error) {
     return{error:"unexpected error occured!"};
    }
  }
}
