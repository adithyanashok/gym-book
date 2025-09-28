import { Gym } from 'src/gym/entities/gym.entity';
import { Member } from 'src/members/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => Gym, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gymId' })
  gym: Gym;

  @ManyToOne(() => Member, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'memberId' })
  member?: Member | null;

  @Column({ type: 'timestamptz', nullable: true })
  scheduledFor?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  sentAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  readAt?: Date | null;

  @Column({ type: 'varchar', length: 64, default: 'membership_expired' })
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
