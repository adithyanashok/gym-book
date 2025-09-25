import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { UserPlan } from './entities/user-plan.entity';
import { Member } from 'src/members/entities/member.entity';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { addMonths } from 'date-fns';

@Injectable()
export class PlanService {
  constructor(
    /**
     * Injecting planRepository
     */
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,

    /**
     * Injecting planRepository
     */
    @InjectRepository(UserPlan)
    private readonly userPlanRepository: Repository<UserPlan>,

    /**
     * Injecting memberRepository
     */
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  // Get plan
  public async findOneBy(id: number): Promise<Plan | null> {
    try {
      // Create Plan
      const plan = await this.planRepository.findOneBy({ id });

      // Return plan
      return plan;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  // Createing new plan
  public async create(createPlanDto: CreatePlanDto) {
    try {
      // Create Plan
      const Plan = this.planRepository.create(createPlanDto);

      // Save Plan
      const savedPlan = await this.planRepository.save(Plan);

      // Return response
      return new ApiResponse(true, 'Plan Created', savedPlan);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  // Get plans
  public async getPlans(gymId: number): Promise<ApiResponse<Plan[]>> {
    console.log(gymId);
    try {
      // Get Plan
      const plans = await this.planRepository.find({ where: { gym: { id: gymId } } });

      // Return response
      return new ApiResponse(true, 'Successfull Fetched!', plans);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  // Update Plan
  public async updateById(id: number, updatePlanDto: UpdatePlanDto) {
    try {
      // Find Plan
      const Plan = await this.planRepository.findOneBy({ id });

      if (!Plan) {
        throw new BadRequestException(`Plan with ID ${id} is not exist`);
      }

      // Assign new Plan
      Object.assign(Plan, updatePlanDto);

      // Save New Plan
      const updatedPlan = await this.planRepository.save(Plan);

      // Return response
      return new ApiResponse(true, 'Successfully Updated', updatedPlan);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Createing new user plan
  public async createUserPlan(member: Member) {
    try {
      const userPlan = this.userPlanRepository.create({
        member: member,
        memberId: member.id,
        plan: member.plan,
        planId: member.planId,
      });

      await this.userPlanRepository.save(userPlan);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong when creating user plan');
    }
  }

  // // Createing new user plan
  // public async getRevanueByDate(dateRange: GetByDateDto) {
  //   try {
  //     const { startDate } = dateRange;

  //     // Convert string dates to Date objects
  //     const start = new Date(startDate);
  //     const end = addMonths(start, 1);
  //     end.setHours(23, 59, 59, 999);

  //     // Query members created within date range
  //     const userPlan = await this.userPlanRepository
  //       .createQueryBuilder('userPlan')
  //       .where('userPlan.createdAt BETWEEN :start AND :end', { start, end })
  //       .leftJoinAndSelect('userPlan.member', 'member')
  //       .leftJoinAndSelect('member.plan', 'plan')
  //       .orderBy('userPlan.createdAt', 'ASC')
  //       .getMany();

  //     // Group plans by month and count them
  //     const monthlyRevenue = userPlan.reduce((prevUserPlan, userPlan) => {
  //       const monthYear = userPlan.createdAt.toLocaleString('default', {
  //         month: 'long',
  //         year: 'numeric',
  //       });

  //       if (!prevUserPlan[monthYear]) {
  //         prevUserPlan[monthYear] = 0;
  //       }

  //       // Add the plan amount to the monthly total
  //       prevUserPlan[monthYear] += userPlan.member.plan.amount;

  //       return prevUserPlan;
  //     }, {});
  //     // Convert to array format
  //     const result = Object.entries(monthlyRevenue).map(([month, revanue]) => ({
  //       month,
  //       revanue,
  //     }));

  //     const totalRevanue = userPlan.reduce(
  //       (prev, userPlan) => {
  //         prev['totalRev'] += userPlan.member.plan.amount;

  //         return prev;
  //       },
  //       { totalRev: 0 },
  //     );
  //     const data = {
  //       totalRevanue: totalRevanue.totalRev,
  //       monthlyRevenues: result,
  //     };

  //     return new ApiResponse(true, 'Successfully Fetched', data);
  //   } catch (error) {
  //     console.log(error);
  //     throw new BadRequestException();
  //   }
  // }

  // Get plan distribution
  public async getPlanDistribution(dateRangeDto: GetByDateDto) {
    try {
      const { startDate } = dateRangeDto;

      const start = new Date(startDate);
      const end = addMonths(start, 1);
      end.setHours(23, 59, 59, 999);

      const userPlans = await this.userPlanRepository
        .createQueryBuilder('userPlan')
        .where('userPlan.createdAt BETWEEN :start AND :end', { start, end })
        .leftJoinAndSelect('userPlan.plan', 'plan')
        .orderBy('userPlan.createdAt', 'ASC')
        .getMany();

      console.log(userPlans);

      const plansCount = userPlans.reduce((prev, curr) => {
        if (!prev[curr.plan.name]) {
          prev[curr.plan.name] = 0;
        }
        prev[curr.plan.name]++;

        return prev;
      }, {});

      const entries: [string, number][] = Object.entries(plansCount);

      const totalCount = entries.reduce((prev, curr) => {
        prev = prev + curr[1];

        return prev;
      }, 0);

      const returnObject = entries.map((value) => {
        const percentage = (value[1] / totalCount) * 100;

        const val = {
          plan: value[0],
          percentage: percentage.toFixed(2),
        };

        return val;
      });

      return new ApiResponse(true, 'Successfully Fetched', returnObject);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong while fetching');
    }
  }
}
