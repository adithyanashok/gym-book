import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlan } from './entities/subscription-plans';
import { StripeProvider } from './providers/stripe.provider';
import { GymModule } from 'src/gym/gym.module';
import { Gym } from 'src/gym/entities/gym.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan, Gym]), GymModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, StripeProvider],
})
export class SubscriptionModule {}
