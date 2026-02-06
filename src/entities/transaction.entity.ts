import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'amount', type: 'int' })
  amount: number;

  @Column({ name: 'description', type: 'char' })
  description: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
