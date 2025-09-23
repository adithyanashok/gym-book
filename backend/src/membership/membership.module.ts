import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Member } from 'src/members/entities/member.entity';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService],
  imports: [TypeOrmModule.forFeature([Membership, Member])],
  exports: [MembershipService],
})
export class MembershipModule {}
