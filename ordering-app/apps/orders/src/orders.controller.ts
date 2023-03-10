import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    console.log(req.user);

    return await this.ordersService.createOrder(request);
  }
  @Get()
  async getOrder() {
    return await this.ordersService.getOrder();
  }
}
