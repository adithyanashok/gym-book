// get-members-by-date.dto.ts
import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetByDateDto {
  @ApiProperty({
    description: 'Start date (YYYY-MM-DD)',
    example: '2024-07-01',
  })
  @IsDateString()
  startDate: string;
}
