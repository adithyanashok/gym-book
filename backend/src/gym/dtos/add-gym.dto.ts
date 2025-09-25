import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { Plan } from 'src/plans/entities/plan.entity';

export class AddGymDto {
  @ApiProperty({ example: 'Fit Hub' })
  @IsString()
  gym_name: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsString()
  user_email: string;

  @ApiProperty({
    example: [
      {
        name: 'Monthly',
        amount: '1000',
        duration: 1,
      },
    ],
  })
  plans: Plan[];
}
