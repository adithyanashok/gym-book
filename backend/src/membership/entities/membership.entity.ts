// membership.entity.ts
import { Member } from 'src/members/entities/member.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @OneToOne(() => Member, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  @JoinColumn()
  member: Member;

  @Column({ type: 'varchar' })
  plan_name: string;

  @Column({ type: 'varchar' })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
