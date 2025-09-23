import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PlanType } from '../enums/plan.enum';
import { Gym } from 'src/gym/entities/gym.entity';

@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => Gym, (gym) => gym.plans, { onDelete: 'CASCADE' })
  gym: Gym;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
