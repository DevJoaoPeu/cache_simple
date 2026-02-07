import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ITransaction } from './dto/transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Controller('transactions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAmount(@Body('businessId') businessId: number): number {
    return this.appService.getAmount(businessId);
  }

  @Post()
  createTransaction(@Body() dto: ITransaction): Promise<void> {
    return this.appService.createTransaction(dto);
  }

  @Get('/all')
  async getAllTransactions(): Promise<TransactionEntity[]> {
    return await this.appService.getAllTransactions();
  }

  @Delete(':id')
  async dropTransaction(@Param('id') transactionId: number): Promise<void> {
    await this.appService.dropTransaction(transactionId);
  }
}
