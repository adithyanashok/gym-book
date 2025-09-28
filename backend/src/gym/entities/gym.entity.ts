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
import { RoleType } from '../enums/role.enum';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', length: 92 })
  gym_name?: string;

  @Column({ nullable: true, type: 'varchar', length: 92 })
  username?: string;

  @Column({ type: 'varchar', length: 92 })
  user_phone: string;

  @Column({ nullable: true, type: 'varchar', length: 92 })
  user_email?: string;

  @OneToMany(() => Plan, (plan) => plan.gym, { cascade: true, onDelete: 'CASCADE' })
  plans?: Plan[];

  @Column({
    type: 'int',
    nullable: true,
  })
  otp?: number | null;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  otp_expire?: number | null;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  isDetailComplete: boolean;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.GYM,
    nullable: false,
  })
  role: RoleType;

  @Column({ type: 'varchar', nullable: true })
  fcm_token?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
