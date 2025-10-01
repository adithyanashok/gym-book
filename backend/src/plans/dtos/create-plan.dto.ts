import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 'Monthly' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 500 })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  duration: number;
}
