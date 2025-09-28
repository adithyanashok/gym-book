import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OtpVerifyDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNumber()
  otp: number;

  @ApiProperty({ example: '1', required: true })
  @IsNumber()
  gymId: number;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  fcm_token?: string;
}
