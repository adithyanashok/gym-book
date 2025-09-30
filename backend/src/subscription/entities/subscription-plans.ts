import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subscription_plans')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('int')
  price: number;

  @Column({ default: 'month' })
  billingCycle: string;

  @Column({ type: 'varchar' })
  maxMembers: string;

  @Column({ type: 'int' })
  workoutPlans: number;

  @Column({ default: true })
  isActive: boolean;
}
