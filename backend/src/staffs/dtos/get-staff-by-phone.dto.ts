import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getStaffByPhoneDto {
  @ApiProperty({ example: '7558006610', required: true })
  @IsString()
  phone: string;
}
