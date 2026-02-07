import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { ITransaction } from './dto/transaction.dto';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  @InjectRepository(TransactionEntity)
  private readonly transactionRepository: Repository<TransactionEntity>;

  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  getAmount(businessId: number): number {
    const amount = this.redis.get(`amount-${businessId}`);

    return 0;
  }

  async createTransaction(dto: ITransaction): Promise<void> {
    await this.transactionRepository.save(dto);
  }

  async getAllTransactions(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }

  async dropTransaction(transactionId: number): Promise<void> {
    await this.transactionRepository.delete({ id: transactionId });
  }
}
