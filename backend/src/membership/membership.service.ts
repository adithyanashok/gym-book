// membership.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMembershipDto } from './dtos/create-membership.dto';
import { Member } from '../members/entities/member.entity';
import { RenewMembershipDto } from './dtos/renew-membership.dto';
import { PlanService } from 'src/plans/plan.service';
import { UpdateEndDateProvider } from 'src/common/providers/update-end-date.provider';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { GymService } from 'src/gym/gym.service';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    /**
     * Injecting planService
     */
    private readonly planService: PlanService,

    /**
     * Injecting updateEndDateProvider
     */
    private readonly updateEndDateProvider: UpdateEndDateProvider,

    /**
     * Injecting gymService
     */
    private readonly gymService: GymService,
  ) {}

  public async create(createMembershipDto: CreateMembershipDto) {
    try {
      // Find the member first
      const member = await this.memberRepository.findOne({
        where: { id: createMembershipDto.memberId },
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${createMembershipDto.memberId} not found`);
      }

      // Create membership with the member relationship
      const membership = this.membershipRepository.create({
        ...createMembershipDto,
        member: member,
      });

      await this.membershipRepository.save(membership);
      return membership;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Renew Membership
  public async renew(gymId: number, renewMembershipDto: RenewMembershipDto) {
    try {
      const { memberId, planId, startDate } = renewMembershipDto;
      // Find the member first
      const member = await this.memberRepository.findOne({
        where: { id: memberId },
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${memberId} not found`);
      }

      const plan = await this.planService.findOneBy(planId);

      if (!plan) {
        throw new NotFoundException(`Plan with ID ${planId} not found`);
      }

      const gym = await this.gymService.findOneById(gymId);

      if (!gym) {
        throw new NotFoundException(`Gym with ID ${gymId} not found`);
      }

      const endDate = this.updateEndDateProvider.updateEndDate(startDate, plan.duration);

      member.plan = plan;
      member.planId = plan.id;
      member.startDate = startDate;
      member.endDate = endDate;

      const renewedMember = await this.memberRepository.save(member);

      await this.create({
        amount: renewedMember.plan.amount,
        endDate: endDate,
        plan_name: renewedMember.plan.name,
        memberId: renewedMember.id,
        startDate: startDate,
        gym: gym,
      });

      return new ApiResponse(true, 'Membership Renewed!', renewedMember);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Renew Membership
  public async getMemberships(memberId: number) {
    try {
      // Find the member first
      const member = await this.memberRepository.findOne({
        where: { id: memberId },
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${memberId} not found`);
      }

      const members = await this.membershipRepository.find({
        where: { member: { id: memberId } },
      });

      return new ApiResponse(true, 'Membership Fetched Successfully!', members);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
