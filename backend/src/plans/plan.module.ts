import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlansController } from './plan.controller';
import { Member } from 'src/members/entities/member.entity';
import { GymModule } from 'src/gym/gym.module';
import { CheckLimitProvider } from 'src/common/providers/check-limit.provider';
import { Gym } from 'src/gym/entities/gym.entity';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Member, Gym]), RedisModule, GymModule],
  controllers: [PlansController],
  providers: [PlanService, CheckLimitProvider, BlacklistService],
  exports: [PlanService],
})
export class PlanModule {}
