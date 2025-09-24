import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Member } from 'src/members/entities/member.entity';
import { UpdateEndDateProvider } from 'src/common/providers/update-end-date.provider';
import { PlanModule } from 'src/plans/plan.module';
import { GymModule } from 'src/gym/gym.module';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService, UpdateEndDateProvider],
  imports: [TypeOrmModule.forFeature([Membership, Member]), PlanModule, GymModule],
  exports: [MembershipService],
})
export class MembershipModule {}
