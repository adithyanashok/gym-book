import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from '../entities/membership.entity';
import { Repository } from 'typeorm';
import { UserPlan } from 'src/plans/entities/user-plan.entity';

@Injectable()
export class GetRevanueByDateProvider {
  constructor(
    /**
     * Injecting planRepository
     */
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    /**
     * Injecting planRepository
     */
    @InjectRepository(UserPlan)
    private readonly userPlanRepository: Repository<UserPlan>,
  ) {}
  public async get(start: Date, end: Date) {
    // Query members created within date range
    const membership = await this.userPlanRepository
      .createQueryBuilder('userPlan')
      .where('userPlan.createdAt BETWEEN :start AND :end', { start, end })
      .leftJoinAndSelect('userPlan.member', 'member')
      .leftJoinAndSelect('member.plan', 'plan')
      .orderBy('userPlan.createdAt', 'ASC')
      .getMany();

    // Group plans by month and count them
    const monthlyRevenue = membership.reduce((prevMembership, membership) => {
      const monthYear = membership.createdAt.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      if (!prevMembership[monthYear]) {
        prevMembership[monthYear] = 0;
      }

      // Add the plan amount to the monthly total
      prevMembership[monthYear] += membership.member.plan.amount;

      return prevMembership;
    }, {});
    // Convert to array format
    const result = Object.entries(monthlyRevenue).map(([month, revanue]: [string, number]) => ({
      month,
      revanue,
    }));

    const totalRevanue = membership.reduce(
      (prev, membership) => {
        prev['totalRev'] += membership.member.plan.amount;

        return prev;
      },
      { totalRev: 0 },
    );
    const data = {
      totalRevanue: totalRevanue.totalRev,
      monthlyRevenues: result,
    };
    return data;
  }
}
