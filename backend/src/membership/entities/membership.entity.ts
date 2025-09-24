// membership.entity.ts
import { Gym } from 'src/gym/entities/gym.entity';
import { Member } from 'src/members/entities/member.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @ManyToOne(() => Member, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @ManyToOne(() => Gym)
  @JoinColumn({ name: 'gymId' })
  gym: Gym;

  @Column({ type: 'varchar' })
  plan_name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
