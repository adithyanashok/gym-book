import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { CheckEmailAndPhoneProvider } from './providers/check-email-and-phone.provider';
import { PlanModule } from 'src/plans/plan.module';
import { AmountsModule } from 'src/amounts/amounts.module';
import { UpdateEndDateProvider } from './providers/update-end-date.provider';
import { GetRevanueByDateProvider } from 'src/revanue/providers/get-revanue-by-date.provider';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { MembershipModule } from 'src/membership/membership.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), PlanModule, AmountsModule, MembershipModule],
  controllers: [MembersController],
  providers: [MembersService, CheckEmailAndPhoneProvider, UpdateEndDateProvider, GetExpiration],
  exports: [MembersService],
})
export class MembersModule {}
