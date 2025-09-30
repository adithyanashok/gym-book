import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({ example: 'Basic Plan', description: 'Name of the subscription plan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '499.99', description: 'Price of the subscription plan' })
  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @ApiProperty({ example: 'month', description: 'Billing cycle of the subscription plan' })
  @IsString()
  @IsNotEmpty()
  billingCycle: string;

  @ApiProperty({
    example: '100',
    description: 'Maximum number of members for the subscription plan',
  })
  @IsNotEmpty()
  maxMembers: string;

  @ApiProperty({ example: 5, description: 'Number of workout plans included in the subscription' })
  @IsNotEmpty()
  workoutPlans: number;

  @ApiProperty({ example: true, description: 'Is the subscription plan active?' })
  @IsNotEmpty()
  isActive: boolean;
}
