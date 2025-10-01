import { Injectable, NotFoundException } from '@nestjs/common';
import { Gym } from 'src/gym/entities/gym.entity';
import { Member } from '../../members/entities/member.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckLimitProvider {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
  ) {}
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

  public async hasSubscription(gymId: number): Promise<boolean> {
    try {
      const gym = await this.gymRepository.findOne({ where: { id: gymId } });
      if (!gym) {
        throw new NotFoundException('Gym not found');
      }
      if (gym.active === true) {
        if (new Date() > gym.subscriptionEnd) {
          gym.active = false;
          await this.gymRepository.save(gym);
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
