import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlansController } from './plan.controller';
import { Member } from 'src/members/entities/member.entity';
import { GymModule } from 'src/gym/gym.module';
import { CheckLimitProvider } from 'src/common/providers/check-limit.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Member]), GymModule],
  controllers: [PlansController],
  providers: [PlanService, CheckLimitProvider],
  exports: [PlanService],
})
export class PlanModule {}
