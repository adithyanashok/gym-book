import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { GetRevanueByDateProvider } from './providers/get-revanue-by-date.provider';
import { addMonths } from 'date-fns';
import { Membership } from 'src/membership/entities/membership.entity';

@Injectable()
export class RevanueService {
  constructor(
    /**
     * Injecting planRepository
     */
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    /**
     * Injecting getRevanueByDateProvider
     */
    private readonly getRevanueByDateProvider: GetRevanueByDateProvider,
  ) {}

  // Createing new user plan
  public async getRevanueByDate(dateRange: GetByDateDto, gymId: number) {
    try {
      const { startDate } = dateRange;

      // Convert string dates to Date objects
      const start = new Date(startDate);

      const end = addMonths(start, 1);
      end.setHours(23, 59, 59, 999);

      const year = new Date().getFullYear();

      const startOfYear = new Date(year, 0, 1);

      const endOfYear = new Date(year, 11, 31);

      const data = await this.getRevanueByDateProvider.get(startOfYear, endOfYear, gymId);
      console.log('REVANUES ', data);
      return new ApiResponse(true, 'Successfully Fetched', data);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
