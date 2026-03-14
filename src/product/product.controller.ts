import {Controller,Post,Get,Param,Delete,Patch,Body,UploadedFiles,UseInterceptors,}from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { multerConfig } from './multer.config';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, multerConfig))
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.create(dto, files);
  }

  @Get()
  findAll(@Param('id') seller_id: string) {
    return this.productService.findAll(seller_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}