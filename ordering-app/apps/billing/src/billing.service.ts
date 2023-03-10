import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  // constructor(private readonly) {}

  bill(data: any): void {
    console.log('am i called???');

    this.logger.log('billing...', data);
    // return 'ok';
  }
}
