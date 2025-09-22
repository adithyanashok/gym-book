import { Module } from '@nestjs/common';
import { RevanueService } from './revanue.service';
import { RevanueController } from './revanue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';

import { UserPlan } from 'src/plans/entities/user-plan.entity';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { GetRevanueByDateProvider } from './providers/get-revanue-by-date.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Membership, UserPlan])],
  providers: [RevanueService, GetRevanueByDateProvider],
  controllers: [RevanueController],
})
export class RevanueModule {}
