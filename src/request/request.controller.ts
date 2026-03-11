import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';



@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('images',{
      storage:diskStorage({
        destination:'./uploads',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      })
    })
  )
  
  create(
     @UploadedFile() file: Express.Multer.File,
     @Body() createDto: CreateRequestDto,
  ) {
    return this.requestService.create(createDto,file.filename)
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
