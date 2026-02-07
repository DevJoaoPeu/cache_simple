import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ITransaction } from './dto/transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Controller('transactions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAmount(@Query('businessId') businessId: number): Promise<number> {
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
