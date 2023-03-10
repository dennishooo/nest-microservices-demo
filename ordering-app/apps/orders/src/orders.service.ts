import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constant/services';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  protected readonly logger = new Logger(OrdersService.name);

  async createOrder(request: CreateOrderRequest) {
    this.logger.log('creating order...', request);
    // const session = await this.orderRepository.startTransaction();
    try {
      const order = await this.orderRepository.create(
        request,
        // { session }
      );
      await lastValueFrom(this.billingClient.emit('order_created', request));
      // await session.commitTransaction();
      return order;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    }
  }
  async getOrder() {
    return await this.orderRepository.find({});
  }
}
