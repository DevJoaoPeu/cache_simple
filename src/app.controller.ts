import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAmount(): number {
    return this.appService.getAmount();
  }

  @Post()
  createTransaction(): void {
    return this.appService.createTransaction();
  }
}
