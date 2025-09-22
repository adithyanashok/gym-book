import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: '7558006610' })
  @IsString()
  phoneNumber: string;
}
