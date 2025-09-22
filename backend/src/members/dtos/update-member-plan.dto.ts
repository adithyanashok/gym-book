import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMemberPlanDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @ApiProperty({ example: '2025-09-12T20:14:04.027Z' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;
}
