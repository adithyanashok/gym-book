import { Gym } from 'src/gym/entities/gym.entity';

export class CreateMembershipDto {
  startDate: Date;
  endDate: Date;
  memberId: number;
  plan_name: string;
  amount: number;
  gym: Gym;
}
