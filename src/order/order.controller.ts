import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Req() req:any) {
    const {id, role} = req.user
    return this.orderService.findAll(id,role);
  }

  @Get(':id')
  findOne(@Req() req:any ,@Param('id') id: string) {
    const {id:userId, role} = req.user
    return this.orderService.findOne(id, userId, role);
  }

  @Patch(':id')
  update(@Req() req:any, @Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const{role} = req.user
    return this.orderService.update(id, updateOrderDto, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
