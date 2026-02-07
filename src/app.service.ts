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

  async getAmount(businessId: number): Promise<number> {
    const amount: string | null = await this.redis.get(`amount-${businessId}`);

    if (!amount) {
      const transactions: TransactionEntity[] =
        await this.transactionRepository.find({
          where: { fk_business: +businessId },
        });

      const totalAmount: number = transactions.reduce(
        (sum: number, transaction: TransactionEntity): number =>
          sum + transaction.amount,
        0,
      );

      this.redis.set(`amount-${businessId}`, totalAmount.toString());

      return totalAmount;
    }

    return +amount;
  }

  async createTransaction(dto: ITransaction): Promise<void> {
    const { fk_business, amount } = dto;

    const prevAmount: number = Number(
      (await this.redis.get(`amount-${fk_business}`)) || 0,
    );

    this.redis.set(`amount-${fk_business}`, prevAmount + amount);

    await this.transactionRepository.save(dto);
  }

  async getAllTransactions(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }

  async dropTransaction(transactionId: number): Promise<void> {
    await this.transactionRepository.delete({ id: transactionId });
  }
}
