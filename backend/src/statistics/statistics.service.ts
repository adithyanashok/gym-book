import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMonths, subMonths } from 'date-fns';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { Member } from 'src/members/entities/member.entity';
import { Membership } from 'src/revanue/entities/membership.entity';
import { GetRevanueByDateProvider } from 'src/revanue/providers/get-revanue-by-date.provider';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    /**
     * injecting memberRepository
     */
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    /**
     * Injecting membershipRepository
     */
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    /**
     * Injecting getRevanueByDateProvider
     */
    private readonly getRevanueByDateProvider: GetRevanueByDateProvider,

    /**
     * Injecting getExpiresInProvider
     */
    private readonly getExpiresInProvider: GetExpiration,
  ) {}

  public async getMonthlyStatistics(dateDto: GetByDateDto) {
    const { startDate } = dateDto;

    const start = new Date(startDate);
    const end = addMonths(start, 1);

    // Previous Month
    const prevMonthStart = subMonths(start, 1);
    const prevMonthEnd = start;

    // Current Year
    const year = new Date().getFullYear();

    const startOfYear = new Date(year, 0, 1);

    const endOfYear = new Date(year, 11, 31);

    // Set time boundaries correctly
    end.setHours(23, 59, 59, 999);
    prevMonthEnd.setHours(23, 59, 59, 999);

    try {
      // Execute all async operations in parallel for better performance
      const [totalMembers, revenueRaw, prevRevenueRaw] = await Promise.all([
        this.getMembersInDateRange(startOfYear, endOfYear),
        this.getRevanueByDateProvider.get(start, end),
        this.getRevanueByDateProvider.get(prevMonthStart, prevMonthEnd),
      ]);

      // Members from previous month
      const prevMonthMembers = totalMembers.filter((value) => {
        const date = new Date(value.createdAt);
        return date >= prevMonthStart && date <= prevMonthEnd;
      });

      // Members between dates
      const members = totalMembers.filter((value) => {
        const date = new Date(value.createdAt);
        return date >= start && date <= end;
      });

      // Map monthlyRevenues to extract revenue values correctly
      const currentMonthRevenue = revenueRaw.monthlyRevenues[0]?.revanue ?? 0;
      const prevMonthRevenue = prevRevenueRaw.monthlyRevenues[0]?.revanue ?? 0;

      const currentMonth = revenueRaw.monthlyRevenues[0]?.month ?? 0;

      const activeMembers = members.filter(
        (member) => this.getExpiresInProvider.getDaysUntilExpiration(member.endDate) > 0,
      );

      const newMembers = members.filter((member) =>
        isSameYearAndMonth(member.createdAt, new Date()),
      );

      const revenueIncrease = this.calculatePercentageIncrease(
        currentMonthRevenue,
        prevMonthRevenue,
      );
      const memberIncrease = this.calculatePercentageIncrease(
        members.length,
        prevMonthMembers.length,
      );

      const data = {
        totalMembers: totalMembers.length,
        revenue: currentMonthRevenue,
        activeMembers: activeMembers.length,
        newMembers: newMembers.length,
        revenueIncrease,
        memberIncrease,
        prevMonthMembersCount: prevMonthMembers.length,
        prevMonthRevenue,
        currentMonth,
      };

      return new ApiResponse(true, 'Successfully Fetched', data);
    } catch (error) {
      console.log(error);
      // Proper error handling
      throw new InternalServerErrorException('Could not retrieve monthly statistics');
    }
  }

  // Helper method to avoid code duplication
  private async getMembersInDateRange(start: Date, end: Date) {
    return this.memberRepository
      .createQueryBuilder('member')
      .where('member.createdAt BETWEEN :start AND :end', { start, end })
      .orderBy('member.createdAt', 'ASC')
      .getMany();
  }

  // Percentage calculation function
  private calculatePercentageIncrease(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    const increase = ((current - previous) / previous) * 100;

    return Math.round(increase * 100) / 100;
  }
}

function isSameYearAndMonth(date1: Date, date2: Date) {
  const str1 = date1.toISOString().slice(0, 7);
  const str2 = date2.toISOString().slice(0, 7);
  return str1 === str2;
}
