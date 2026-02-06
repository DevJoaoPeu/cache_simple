import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ITransaction } from './dto/transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Controller('transactions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAmount(): number {
    return this.appService.getAmount();
  }

  @Post()
  createTransaction(@Body() dto: ITransaction): Promise<void> {
    return this.appService.createTransaction(dto);
  }

  @Get('/all')
  async getAllTransactions(): Promise<TransactionEntity[]> {
    return await this.appService.getAllTransactions();
  }
}
