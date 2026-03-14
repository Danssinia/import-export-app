import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto, files: Express.Multer.File[]) {
    const imagePaths = files.map((file) => file.filename);
    return this.prisma.product.create({
      data: {seller_id:dto.seller_id,
              title:dto.title,description:dto.description,price:dto.price,
              category:dto.category,type:dto.type,
              totalCount:parseInt(dto.totalCount+""),soldCount:parseInt(dto.soldCount+""),
        images: imagePaths,
      },
    });
  }

  async findAll(seller_id:string) {
    return this.prisma.product.findMany({
      where: { seller_id },//get their own products
      include: {
        seller: true,
      },
    });
  }

  async findOne(product_id: string) {
    return this.prisma.product.findUnique({
      where: { product_id },
      include: {
        seller: true,
        order: true,
      },
    });
  }

  async update(product_id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { product_id },
      data: {seller_id:dto.seller_id,
              title:dto.title,description:dto.description,price:dto.price,
              category:dto.category,type:dto.type,
              totalCount:parseInt(dto.totalCount+""),soldCount:parseInt(dto.soldCount+"")},
    });
  }

  async delete(product_id: string) {
    return this.prisma.product.delete({
      where: { product_id },
    });
  }
}