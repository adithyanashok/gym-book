import { Exclude } from 'class-transformer';
import { Plan } from 'src/plans/entities/plan.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 92 })
  gym_name: string;

  @Column({ type: 'varchar', length: 92 })
  username: string;

  @Column({ type: 'varchar', length: 92 })
  user_phone: string;

  @Column({ type: 'varchar', length: 92 })
  user_email: string;

  @OneToMany(() => Plan, (plan) => plan.gym, { cascade: true, onDelete: 'CASCADE' })
  plans: Plan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
