import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchMemberDto {
  @ApiProperty({ required: false, example: 'Adithyan' })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 20 })
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false, example: 1 })
  @IsInt()
  @IsOptional()
  planId?: number;
}
