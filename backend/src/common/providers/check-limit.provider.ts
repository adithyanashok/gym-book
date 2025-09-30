import { Injectable } from '@nestjs/common';
import { Gym } from 'src/gym/entities/gym.entity';
import { Member } from '../../members/entities/member.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Injectable()
export class CheckLimitProvider {
  public hasReachedMemberLimit(gym: Gym, members: Member[]): boolean {
    if (gym.subscriptionPlan.maxMembers !== 'unlimited') {
      if (members.length >= parseInt(gym.subscriptionPlan.maxMembers)) {
        return true;
      }
    }
    return false;
  }

  public hasReachedPlanLimit(gym: Gym, plans: Plan[]): boolean {
    console.log(gym.subscriptionPlan.workoutPlans, plans.length);
    if (plans.length >= gym.subscriptionPlan.workoutPlans) {
      return true;
    }

    return false;
  }
}
