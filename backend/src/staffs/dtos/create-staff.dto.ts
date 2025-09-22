import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'Adithyan', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: '7558006610', required: true })
  @IsString()
  phone: string;
}
