import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMonths, subMonths } from 'date-fns';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { Member } from 'src/members/entities/member.entity';
import { Membership } from 'src/membership/entities/membership.entity';
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

  public async getMonthlyStatistics(dateDto: GetByDateDto, gymId: number) {
    const { startDate } = dateDto;
    const start = new Date(startDate);

    // Previous Month
    const prevMonthStart = subMonths(start, 1);
    const prevMonthEnd = addMonths(prevMonthStart, 1);

    // Current Month

    const startMonth = start;
    const end = addMonths(startMonth, 1);

    // Current Year
    const year = new Date().getFullYear();

    const startOfYear = new Date(year, 0, 1);

    const endOfYear = new Date(year, 11, 31);
    prevMonthEnd.setHours(23, 59, 59, 999);
    try {
      // Execute all async operations in parallel for better performance
      const [totalMembers, revenueRaw, prevRevenueRaw] = await Promise.all([
        this.getMembersInDateRange(startOfYear, endOfYear, gymId),
        this.getRevanueByDateProvider.get(start, end, gymId),
        this.getRevanueByDateProvider.get(prevMonthStart, prevMonthEnd, gymId),
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

      // Current Month Data
      const currentData = revenueRaw.monthlyRevenues[0];
      const currentMonth = currentData?.month;
      const revanue = currentData?.revanue ?? 0;

      // Prev Month Data
      const prevData = prevRevenueRaw.monthlyRevenues[0];
      const prevMonthRevenue = prevData?.revanue ?? 0;
      console.log(prevMonthStart);
      console.log(prevMonthEnd);

      const activeMembers = members.filter(
        (member) => this.getExpiresInProvider.getDaysUntilExpiration(member.endDate) > 0,
      );

      const newMembers = members.filter((member) =>
        isSameYearAndMonth(member.createdAt, new Date()),
      );

      const revenueIncrease = this.calculatePercentageIncrease(revanue ?? 0, prevMonthRevenue);
      const memberIncrease = this.calculatePercentageIncrease(
        members.length,
        prevMonthMembers.length,
      );

      const data = {
        currentMonthData: {
          revenue: revanue,
          currentMonth,
          revenueIncrease,
          memberIncrease,
          activeMembers: activeMembers.length,
          newMembers: newMembers.length,
        },
        prevMonthData: {
          prevMonthMembersCount: prevMonthMembers.length,
          prevMonthRevenue,
        },
        totalMembers: totalMembers.length,
      };

      return new ApiResponse(true, 'Successfully Fetched', data);
    } catch (error) {
      console.log(error);
      // Proper error handling
      throw new InternalServerErrorException('Could not retrieve monthly statistics');
    }
  }

  // Helper method to avoid code duplication
  private async getMembersInDateRange(start: Date, end: Date, gymId: number) {
    return this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.gym', 'gym')
      .where('member.createdAt BETWEEN :start AND :end', { start, end })
      .where('member.gymId = :gymId', { gymId })
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
