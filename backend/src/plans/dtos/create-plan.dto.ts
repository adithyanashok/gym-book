import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { PlanType } from '../enums/plan.enum';

export class CreatePlanDto {
  @ApiProperty({ example: 'Monthly' })
  @IsString()
  @IsNotEmpty()
  name: PlanType;

  @ApiProperty({ example: 500 })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  amount: number;
}
