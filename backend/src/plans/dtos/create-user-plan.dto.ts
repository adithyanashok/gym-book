import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserPlanDto {
  @IsInt()
  @IsNotEmpty()
  memberId: number;

  @IsInt()
  @IsNotEmpty()
  planId: number;
}
