import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { UserPlan } from 'src/plans/entities/user-plan.entity';
import { GetRevanueByDateProvider } from './providers/get-revanue-by-date.provider';
import { addMonths } from 'date-fns';

@Injectable()
export class RevanueService {
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

    /**
     * Injecting getRevanueByDateProvider
     */
    private readonly getRevanueByDateProvider: GetRevanueByDateProvider,
  ) {}

  // Createing new user plan
  public async getRevanueByDate(dateRange: GetByDateDto) {
    try {
      const { startDate } = dateRange;

      // Convert string dates to Date objects
      const start = new Date(startDate);

      const end = addMonths(start, 1);
      end.setHours(23, 59, 59, 999);

      const year = new Date().getFullYear();

      const startOfYear = new Date(year, 0, 1);

      const endOfYear = new Date(year, 11, 31);

      const data = await this.getRevanueByDateProvider.get(startOfYear, endOfYear);

      return new ApiResponse(true, 'Successfully Fetched', data);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
