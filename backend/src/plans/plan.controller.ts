import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { PlanService } from './plan.service';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import type { AuthenticatedRequest } from 'src/common/request/request';
import { SubscriptionGuard } from 'src/common/guards/subscription.guard';
@ApiBearerAuth()
@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(
    /**
     * Injecting plansService
     */
    private readonly planService: PlanService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new plans' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(SubscriptionGuard)
  public async create(@Req() req: AuthenticatedRequest, @Body() createplanDto: CreatePlanDto) {
    console.log(createplanDto);
    return this.planService.create(req.user['sub'], createplanDto);
  }

  // Get all plans
  @Get()
  @ApiOperation({ summary: 'Get all plans' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async getPlans(@Req() req: AuthenticatedRequest) {
    return this.planService.getPlans(req.user['sub']);
  }

  // Update plan By Id
  @Patch(':id')
  @ApiOperation({ summary: 'Update plan By Id' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(SubscriptionGuard)
  public updateById(@Param('id') id: number, @Body() updateplanDto: UpdatePlanDto) {
    return this.planService.updateById(id, updateplanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete plan By Id' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(SubscriptionGuard)
  public deleteById(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    return this.planService.deleteById(req.user['sub'], id);
  }

  @Get('/get-plan-distribution')
  @ApiOperation({ summary: 'Get plan distribution' })
  @ApiResponse({ status: 200, description: 'Retrieved successfully' })
  public async getPlanDistribution(
    @Req() req: AuthenticatedRequest,
    @Query() dateRangeDto: GetByDateDto,
  ) {
    return await this.planService.getPlanDistribution(req.user['sub'], dateRangeDto);
  }
}
