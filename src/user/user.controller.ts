import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const{userId,role} = req.user
    return this.userService.findOne(id,userId,role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Req() req:any) {
    const {userId, role} = req.user
    return this.userService.update(id, updateUserDto, userId, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/deactivate')
  deactivate(id: string){
    return this.userService.deactivate(id)
  }

   @Patch(':id/activate')
  activate(id: string){
    return this.userService.activate(id)
  }
}
