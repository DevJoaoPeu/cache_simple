import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAmount(): number {
    return 0;
  }

  createTransaction(): void {}
}
