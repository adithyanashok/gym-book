import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { Member } from 'src/members/entities/member.entity';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { addMonths } from 'date-fns';
import { GymService } from 'src/gym/gym.service';
import { CheckLimitProvider } from 'src/common/providers/check-limit.provider';

@Injectable()
export class PlanService {
  constructor(
    /**
     * Injecting planRepository
     */
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,

    /**
     * Injecting memberRepository
     */
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    /**
     * Injecting gymService
     */
    private readonly gymService: GymService,

    /**
     * Injecting checkLimitProvider
     */
    private readonly checkLimitProvider: CheckLimitProvider,
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

  // Creating new plan
  public async create(gymId: number, createPlanDto: CreatePlanDto) {
    try {
      const gym = await this.gymService.findOneById(gymId);
      console.log(gym);
      if (gym.plans && this.checkLimitProvider.hasReachedPlanLimit(gym, gym.plans)) {
        throw new BadRequestException(
          `Gym has reached the maximum plans. Upgrade your plan to add more plans.`,
        );
      }

      if (!gym) {
        throw new NotFoundException('Gym not found');
      }
      // Create Plan
      const plan = this.planRepository.create({ ...createPlanDto, gym });

      // Save Plan
      const savedPlan = await this.planRepository.save(plan);

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

  public async deleteById(gymId: number, id: number) {
    try {
      // Find Plan
      const Plan = await this.planRepository.findOne({ where: { id, gym: { id: gymId } } });

      if (!Plan) {
        throw new BadRequestException(`Plan with ID ${id} is not exist`);
      }

      // Delete Plan
      await this.planRepository.delete({ id, gym: { id: gymId } });

      // Return response
      return new ApiResponse(true, 'Successfully Deleted', Plan);
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException('Plan is associated with a member. Cannot delete the plan');
      }
      console.log(error);
      throw error;
    }
  }

  // Get plan distribution
  public async getPlanDistribution(gymId: number, dateRangeDto: GetByDateDto) {
    try {
      const { startDate } = dateRangeDto;

      const start = new Date(startDate);
      const end = addMonths(start, 1);
      end.setHours(23, 59, 59, 999);

      const memberships = await this.memberRepository
        .createQueryBuilder('membership')
        .leftJoinAndSelect('membership.gym', 'gym')
        .where('membership.createdAt BETWEEN :start AND :end AND membership.gymId = :gymId ', {
          start,
          end,
          gymId,
        })
        .leftJoinAndSelect('membership.plan', 'plan')
        .orderBy('membership.createdAt', 'ASC')
        .getMany();

      console.log(memberships);

      const plansCount = memberships.reduce((prev, curr) => {
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
