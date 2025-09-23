// membership.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMembershipDto } from './create-membership.dto';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
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
        startDate: createMembershipDto.startDate,
        endDate: createMembershipDto.endDate,
        plan_name: createMembershipDto.plan_name,
        amount: createMembershipDto.amount,
        member: member,
      });

      await this.membershipRepository.save(membership);
      return membership;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
