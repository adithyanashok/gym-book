import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGymDto {
  @ApiProperty({ example: 'Fit Hub' })
  @IsOptional()
  @IsString()
  gym_name?: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsOptional()
  @IsString()
  user_email?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  fcm_token?: string;
}
