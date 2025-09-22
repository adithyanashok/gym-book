import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OtpVerifyDto {
  @ApiProperty({ example: '1234', required: true })
  @IsNumber()
  otp: number;

  @ApiProperty({ example: '1', required: true })
  @IsNumber()
  staffId: number;
}
