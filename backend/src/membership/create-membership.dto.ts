import { Member } from 'src/members/entities/member.entity';

export class CreateMembershipDto {
  startDate: Date;
  endDate: Date;
  memberId: number;
  plan_name: string;
  amount: number;
}
