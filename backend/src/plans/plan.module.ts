import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlansController } from './plan.controller';
import { UserPlan } from './entities/user-plan.entity';
import { Member } from 'src/members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, UserPlan, Member])],
  controllers: [PlansController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
