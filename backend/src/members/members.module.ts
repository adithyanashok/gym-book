import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { CheckEmailAndPhoneProvider } from './providers/check-email-and-phone.provider';
import { PlanModule } from 'src/plans/plan.module';
import { AmountsModule } from 'src/amounts/amounts.module';
import { UpdateEndDateProvider } from '../common/providers/update-end-date.provider';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { MembershipModule } from 'src/membership/membership.module';
import { GymModule } from 'src/gym/gym.module';
import { CheckLimitProvider } from 'src/common/providers/check-limit.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    PlanModule,
    AmountsModule,
    MembershipModule,
    GymModule,
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
    CheckEmailAndPhoneProvider,
    UpdateEndDateProvider,
    GetExpiration,
    CheckLimitProvider,
  ],
  exports: [MembersService],
})
export class MembersModule {}
