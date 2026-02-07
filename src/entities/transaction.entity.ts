import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'amount', type: 'int' })
  amount: number;

  @Column({ name: 'fk_business', type: 'int' })
  fk_business: number;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'created_at', type: 'timestamp', default: new Date() })
  created_at: Date;
}
