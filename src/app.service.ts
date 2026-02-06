import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { ITransaction } from './dto/transaction.dto';

@Injectable()
export class AppService {
  @InjectRepository(TransactionEntity)
  private readonly transactionRepository: Repository<TransactionEntity>;

  getAmount(): number {
    return 0;
  }

  async createTransaction(dto: ITransaction): Promise<void> {
    await this.transactionRepository.save(dto);
  }

  async getAllTransactions(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }
}
