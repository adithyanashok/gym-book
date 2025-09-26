import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dtos/create-member.dto';
import { ILike, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { CheckEmailAndPhoneProvider } from './providers/check-email-and-phone.provider';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { PlanService } from 'src/plans/plan.service';
import { UpdateMemberPlanDto } from './dtos/update-member-plan.dto';
import { GetByDateDto } from '../common/dtos/get-by-date.dto';
import { AmountsService } from 'src/amounts/amounts.service';
import { instanceToPlain } from 'class-transformer';
import { addMonths } from 'date-fns';
import { UpdateEndDateProvider } from '../common/providers/update-end-date.provider';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { MembershipService } from 'src/membership/membership.service';
import { GymService } from 'src/gym/gym.service';
import { SearchMemberDto } from './dtos/search-member.dto';

@Injectable()
export class MembersService {
  constructor(
    /**
     * Injecting memberRepository
     */
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    /**
     * Injecting checkEmailAndPhoneProvider
     */
    private readonly checkEmailAndPhoneProvider: CheckEmailAndPhoneProvider,

    /**
     * Injecting planService
     */
    private readonly planService: PlanService,

    /**
     * Injecting updateEndDateProvider
     */
    private readonly updateEndDateProvider: UpdateEndDateProvider,

    /**
     * Injecting amountsService
     */
    private readonly amountsService: AmountsService,

    /**
     * Injecting getExpiresInProvider
     */
    private readonly getExpiresInProvider: GetExpiration,

    /**
     * Injecting membershipService
     */
    private readonly membershipService: MembershipService,

    /**
     * Injecting gymService
     */
    private readonly gymService: GymService,
  ) {}

  // Create a new member
  public async create(createMemberDto: CreateMemberDto) {
    try {
      // Throw new error if phone number already exist
      if (await this.checkEmailAndPhoneProvider.phoneExists(createMemberDto.phone)) {
        throw new BadRequestException(`Member with ${createMemberDto.phone} is exist`);
      }

      // Throw new error if email already exist
      if (await this.checkEmailAndPhoneProvider.emailExists(createMemberDto.email)) {
        throw new BadRequestException(`Member with ${createMemberDto.email} is exist`);
      }

      const plan = await this.planService.findOneBy(createMemberDto.planId);

      const gym = await this.gymService.findOneById(createMemberDto.gymId);

      if (!plan) {
        throw new BadRequestException(`Plan with ID ${createMemberDto.planId} is not exist`);
      }
      if (!gym) {
        throw new BadRequestException(`Gym with ID ${createMemberDto.gymId} is not exist`);
      }

      const planDuration = plan.duration;

      const endDate = this.updateEndDateProvider.updateEndDate(
        createMemberDto.startDate,
        planDuration,
      );

      // Create member
      const memberInstance = this.memberRepository.create({
        ...createMemberDto,
        endDate: endDate,
        plan: plan,
        gym,
      });

      // Save Member
      const newMember = await this.memberRepository.save(memberInstance);

      await this.membershipService.create({
        amount: plan.amount,
        endDate,
        memberId: newMember.id,
        plan_name: plan.name,
        startDate: newMember.startDate,
        gym: newMember.gym,
      });

      const expiresIn = this.getExpiresInProvider.getDaysUntilExpiration(newMember.endDate);

      // Return Response
      return new ApiResponse(true, 'Member created!', { ...newMember, expiresIn });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get One Member By Id
  public async findById(id: number) {
    try {
      // Find Member
      const member = await this.memberRepository.findOne({ where: { id }, relations: ['plan'] });

      if (!member) {
        throw new BadRequestException(`Member with ID ${id} is not exist`);
      }
      const expiresIn = this.getExpiresInProvider.getDaysUntilExpiration(member.endDate);
      const status = expiresIn <= 0 ? 'expired' : 'active';
      return new ApiResponse(true, 'Successfully Fetched', { ...member, expiresIn, status });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update Member
  public async updateById(id: number, updateMemberDto: UpdateMemberDto) {
    try {
      // Find Member
      const member = await this.memberRepository.findOneBy({ id });

      if (!member) {
        throw new BadRequestException(`Member with ID ${id} is not exist`);
      }

      // Assign new member
      Object.assign(member, updateMemberDto);

      // Save New Member
      const updatedMember = await this.memberRepository.save(member);

      const expiresIn = this.getExpiresInProvider.getDaysUntilExpiration(updatedMember.endDate);
      const status = expiresIn <= 0 ? 'expired' : 'active';

      // Return response
      return new ApiResponse(true, 'Successfully Updated', { ...updatedMember, expiresIn, status });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Renew Plan
  public async updatePlan(id: number, updateMemberPlanDto: UpdateMemberPlanDto) {
    try {
      // Find Member
      const member = await this.memberRepository.findOneBy({ id });
      if (!member) {
        throw new BadRequestException(`Member with ID ${id} is not exist`);
      }

      const plan = await this.planService.findOneBy(updateMemberPlanDto.planId);

      if (!plan) {
        throw new BadRequestException(`Plan with ID ${updateMemberPlanDto.planId} is not exist`);
      }

      member.plan = plan;
      member.startDate = updateMemberPlanDto.startDate;

      const endDate = this.updateEndDateProvider.updateEndDate(
        updateMemberPlanDto.startDate,
        plan.duration,
      );

      // Save New Member
      const updatedMember = await this.memberRepository.save({ ...member, endDate: endDate });

      const expiresIn = this.getExpiresInProvider.getDaysUntilExpiration(updatedMember.endDate);

      const status = expiresIn <= 0 ? 'expired' : 'active';

      return new ApiResponse(true, 'Successfully Updated', { ...updatedMember, expiresIn, status });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getMembersByDateRange(dateRangeDto: GetByDateDto) {
    try {
      const { startDate } = dateRangeDto;

      // Convert string dates to Date objects
      const start = new Date(startDate);
      const end = addMonths(start, 1);
      end.setHours(23, 59, 59, 999);

      // Query members created within date range
      const members = await this.memberRepository
        .createQueryBuilder('member')
        .where('member.createdAt BETWEEN :start AND :end', { start, end })
        .leftJoinAndSelect('member.plan', 'plan')
        .orderBy('member.createdAt', 'ASC')
        .getMany();

      return new ApiResponse(true, `Found ${members.length} members of ${startDate}`, members);
    } catch (error) {
      console.error('Error fetching members by date:', error);
      throw new BadRequestException('Invalid date range provided');
    }
  }

  public async getMembersByCurrentPlan(planId: number) {
    try {
      const plan = await this.planService.findOneBy(planId);
      if (!plan) {
        throw new BadRequestException(`Plan with ID ${planId} not found`);
      }
      console.log(plan);
      const members = await this.memberRepository.find({
        where: { plan: { id: plan.id } },
        relations: ['plan'],
      });

      const transformMembers = instanceToPlain(members);

      return new ApiResponse(true, `Found ${members.length} members`, transformMembers);
    } catch (error) {
      console.error('Error fetching members by plan:', error);
      throw error;
    }
  }

  public async searchMember(gymId: number, searchMemberDto: SearchMemberDto) {
    const { limit, page, planId, query } = searchMemberDto;
    try {
      let returnVal: [Member[], number];
      if (!query) {
        // Return all users if no search query
        returnVal = await this.memberRepository.findAndCount({
          skip: ((page ?? 1) - 1) * (limit ?? 10),
          take: limit,
          where: { gym: { id: gymId }, planId },
          order: { createdAt: 'DESC' },
          relations: ['plan'],
        });
      } else {
        returnVal = await this.memberRepository.findAndCount({
          where: [
            { name: ILike(`%${query}%`) },
            { phone: ILike(`%${query}%`) },
            { gym: { id: gymId }, planId },
          ],
          skip: ((page ?? 1) - 1) * (limit ?? 10),
          take: limit,
          order: { createdAt: 'DESC' },
          relations: ['plan'],
        });
      }

      const returnValue = returnVal[0].map((val) => {
        const expiresIn = this.getExpiresInProvider.getDaysUntilExpiration(val.endDate);
        const status = expiresIn <= 0 ? 'expired' : 'active';

        return {
          ...val,
          expiresIn,
          status,
        };
      });

      returnValue.sort((a, b) => a.expiresIn - b.expiresIn);

      const transformMembers = instanceToPlain(returnValue);

      return new ApiResponse(true, `Found ${returnVal[1]} members`, transformMembers);
    } catch (error) {
      console.error('Error fetching members by plan:', error);
      throw error;
    }
  }
}
