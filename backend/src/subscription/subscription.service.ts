import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { CreateSubscriptionPlanDto } from './dtos/create-subscription-plan.dto';
import { Repository } from 'typeorm';
import { SubscriptionPlan } from './entities/subscription-plans';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { StripeProvider } from './providers/stripe.provider';
import { GymService } from 'src/gym/gym.service';
import { Gym } from 'src/gym/entities/gym.entity';
@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor(
    /**
     * Injecting  Subscription Repository
     */
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,

    /**
     * Injecting Gym Service
     */
    private readonly gymService: GymService,

    /**
     * Injecting Gym Repository
     */
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,

    /**
     * Injecting Config Service
     */
    private configService: ConfigService,

    /**
     * Injecting Stripe Provider
     */
    private readonly stripeProvider: StripeProvider,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY') as string);
  }

  public async createSubscriptionPlan(createSubscriptionPlan: CreateSubscriptionPlanDto) {
    const { name } = createSubscriptionPlan;
    try {
      const existPlan = await this.subscriptionPlanRepository.findOneBy({
        name: name,
      });
      if (existPlan) {
        throw new BadRequestException(`Plan ${name} Already Exist`);
      }
      const newPlan = this.subscriptionPlanRepository.create(createSubscriptionPlan);

      const savedPlan = await this.subscriptionPlanRepository.save(newPlan);

      return new ApiResponse(true, 'Plan Added', savedPlan);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getPlans() {
    try {
      const existPlan = await this.subscriptionPlanRepository.find();

      return new ApiResponse(true, 'Successfully Fetched', existPlan);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async subscribe(gymId: number, planId: number) {
    try {
      const gym = await this.gymService.findOneById(gymId);
      if (!gym) {
        throw new BadRequestException('Gym not found');
      }
      const plan = await this.subscriptionPlanRepository.findOneBy({ id: planId });
      if (!plan) {
        throw new BadRequestException('Plan not found');
      }
      const response = await this.stripeProvider.createCustomer(
        gym.user_email!,
        gym.gym_name!,
        gym.user_phone,
        plan.price,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateSubscription(gymId: number, planId: number) {
    try {
      const gym = await this.gymRepository.findOneBy({ id: gymId });

      if (!gym) {
        throw new NotFoundException('Gym Not Found');
      }

      const plan = await this.subscriptionPlanRepository.findOneBy({
        id: planId,
      });
      if (!plan) {
        throw new NotFoundException('Plan Not Found');
      }

      gym.subscriptionStart = new Date();
      gym.subscriptionEnd = new Date();
      gym.subscriptionEnd.setMonth(gym.subscriptionEnd.getMonth() + 1);
      gym.subscriptionPlan = plan;

      const updatedGym = await this.gymRepository.save(gym);

      console.log(updatedGym);

      return new ApiResponse(true, 'Subscription Updated Successfully', updatedGym);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
