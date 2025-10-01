import { Module } from '@nestjs/common';
import { RevanueService } from './revanue.service';
import { RevanueController } from './revanue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetRevanueByDateProvider } from './providers/get-revanue-by-date.provider';
import { Membership } from 'src/membership/entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  providers: [RevanueService, GetRevanueByDateProvider],
  controllers: [RevanueController],
})
export class RevanueModule {}
