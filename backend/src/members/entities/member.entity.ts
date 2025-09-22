import { Plan } from 'src/plans/entities/plan.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image?: string | null;

  @Column()
  planId: number;

  @ManyToOne(() => Plan, { cascade: true, eager: true })
  @JoinColumn({ name: 'planId' })
  plan: Plan;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'" })
  startDate: Date;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'" })
  endDate: Date;

  // @ManyToOne(() => Plan, (plan) => plan.member, { eager: true })
  // plan: Plan;

  // @OneToMany(() => UserPlan, (userPlan) => userPlan.member)
  // userPlan: UserPlan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
