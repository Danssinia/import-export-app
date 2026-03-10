import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService){}


  //creating an order (place order) (both by Admin and user)
  async create(createOrderDto: CreateOrderDto) {
    //check if the product first exists
    // const productExists = await this.prismaService.product.findUnique({
    //   where:{
    //     product_id: createOrderDto.productId
    //   }
    // })

    // if(!productExists){
    //   throw new NotFoundException("Product Doesn't Exist")
    // }

    const order = await this.prismaService.order.create({
      data: {
        userId: createOrderDto.userId,
        productID: createOrderDto.productId
      }
    })

    return order;

  }


  //All Only by the Admin(later there will be implementation of Guard (RBAC))
  async findAll(userId:string, role:string) {
    //admin sees all orders
    if(role === 'ADMIN'){
      return await this.prismaService.order.findMany({
        include:{
          user: true,
          product: true
        }
      })
    }

    //user see their own order
    return await this.prismaService.order.findMany({
      where:{userId},
      include:{product:true}
    })
  }


  //getting a single Order based on conditions
  async findOne(id: string, userId: string, role:string) {
    //check is the order exists
    const orderExists = await this.prismaService.order.findUnique({
      where:{
        order_id: id
      },
      include:{user:true, product: true}
    })

    if(!orderExists) {
      throw new NotFoundException("Order Not Found")
    }

    //checking the conditions
    if(role!== 'ADMIN' && orderExists.userId!==userId){
      throw new ForbiddenException("Access Denied")
    }

    return orderExists;
  }


  //updating the order status( done only by the admin)
  async update(id: string, updateOrderDto: UpdateOrderDto, role: string) {

    //check if the order exists
    const orderExists = await this.prismaService.order.findUnique({
      where:{
        order_id:id
      }
    })

    if(!orderExists) {
      throw new NotFoundException("Order Not found")
    }


    if(role === 'ADMIN'){
      const updatedOrder = await this.prismaService.order.update({
        where:{order_id:id},
        data: {
          status: updateOrderDto.status
        }
      })

      return updatedOrder;
    }
  }

  async remove(id: string) {
    const orderExists = await this.prismaService.order.findUnique({
      where:{
        order_id: id
      }
    })

    if(!orderExists) {
      throw new NotFoundException("Order Not found")
    }

    return await this.prismaService.order.delete({
      where:{
        order_id:id
      }
    })
  }
}
