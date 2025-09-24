import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class RenewMembershipDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  memberId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  planId: number;

  @ApiProperty({ example: '2025-09-12T20:14:04.027Z' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;
}
