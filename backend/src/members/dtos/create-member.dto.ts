import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { Gym } from 'src/gym/entities/gym.entity';

export class CreateMemberDto {
  @ApiProperty({ example: 'Adithyan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'adithyanashok406@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '7558006610' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  planId: number;

  @ApiProperty({ example: '123 Main St, City, State, Zip' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsEmpty()
  image?: string;

  @ApiProperty({ example: '2025-09-12T20:14:04.027Z' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;
}
