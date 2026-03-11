import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  findAll(@Req() req:any) {
    const {id, role} = req.user
    return this.requestService.findAll(id,role);
  }

  @Get(':id')
  findOne(@Req() req:any, @Param('id') id: string) {
    const {id:userId, role} = req.user
    return this.requestService.findOne(id,userId,role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto:UpdateRequestDto) {
    return this.requestService.update(id,updateDto)
  }

  @Patch(':id/status')
  updateStatus(@Req() req:any, @Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    const {role} = req.user
    return this.requestService.updateStatus(id, updateRequestDto,role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(id);
  }
}
