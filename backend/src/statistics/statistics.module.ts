import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Member } from 'src/members/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetRevanueByDateProvider } from 'src/revanue/providers/get-revanue-by-date.provider';
import { GetExpiration } from 'src/common/providers/get-expiresin.providers';
import { Membership } from 'src/membership/entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membership, Member])],
  controllers: [StatisticsController],
  providers: [StatisticsService, GetRevanueByDateProvider, GetExpiration],
})
export class StatisticsModule {}
