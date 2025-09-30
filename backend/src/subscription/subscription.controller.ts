import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateSubscriptionPlanDto } from './dtos/create-subscription-plan.dto';
import type { AuthenticatedRequest } from 'src/common/request/request';
@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(
    /**
     * Injecting Subscription Service
     */
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post('/payment-sheet/:id')
  @ApiOperation({ summary: 'Payment' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async paymentSheet(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    return await this.subscriptionService.subscribe(req.user['sub'], id);
  }

  @Public()
  @Post('/plan')
  @ApiOperation({ summary: 'Subscription Plan' })
  @ApiResponse({
    status: 201,
    description: 'Plan Addedd',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createSubscriptionPlan(
    @Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ) {
    return await this.subscriptionService.createSubscriptionPlan(createSubscriptionPlanDto);
  }

  @Get('/plans')
  @ApiOperation({ summary: 'Subscription Plan' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async getPlans() {
    return await this.subscriptionService.getPlans();
  }

  @Patch('/update/:planId')
  @ApiOperation({ summary: 'Update Subscription Plan' })
  @ApiResponse({
    status: 200,
    description: 'Subscription Updated Successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async updateSubscription(
    @Req() req: AuthenticatedRequest,
    @Param('planId') planId: number,
  ) {
    return await this.subscriptionService.updateSubscription(req.user['sub'], planId);
  }
}
