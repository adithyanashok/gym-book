import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PlanType } from '../enums/plan.enum';

@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PlanType })
  name: PlanType;

  @Column({ type: 'int' })
  amount: number;

  // @OneToMany(() => Member, (member) => member.plan)
  // member: Member[];

  // @OneToMany(() => UserPlan, (userPlan) => userPlan.plan)
  // userPlan: UserPlan[];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
