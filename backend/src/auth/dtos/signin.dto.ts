import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: '+911234567890' })
  @IsString()
  phoneNumber: string;
}
