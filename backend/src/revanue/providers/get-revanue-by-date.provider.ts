import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from 'src/membership/entities/membership.entity';

@Injectable()
export class GetRevanueByDateProvider {
  constructor(
    /**
     * Injecting membershipRepository
     */
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}
  public async get(start: Date, end: Date, gymId: number) {
    console.log(start);
    console.log(end);
    // Query members created within date range
    const membership = await this.membershipRepository
      .createQueryBuilder('membership')
      .leftJoinAndSelect('membership.gym', 'gym')
      .where('membership.gymId = :gymId', { gymId })
      .where('membership.createdAt BETWEEN :start AND :end', { start, end })
      .orderBy('membership.createdAt', 'ASC')
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
      prevMembership[monthYear] += membership.amount;

      return prevMembership;
    }, {});
    // Convert to array format
    const result = Object.entries(monthlyRevenue).map(([month, revanue]: [string, number]) => ({
      month,
      revanue,
    }));

    const totalRevanue = membership.reduce(
      (prev, membership) => {
        prev['totalRev'] += membership.amount;

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
