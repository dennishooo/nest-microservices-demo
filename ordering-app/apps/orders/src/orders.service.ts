import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(request: CreateOrderRequest) {
    return await this.orderRepository.create(request);
  }
  async getOrder() {
    return await this.orderRepository.find({});
  }
}
