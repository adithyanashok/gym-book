import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../enums/role.enum';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.STAFF,
    nullable: false,
  })
  role: RoleType;

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
}
