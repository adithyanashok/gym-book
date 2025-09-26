import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { PlanService } from './plan.service';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import type { AuthenticatedRequest } from 'src/common/request/request';
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
  public updateById(@Param('id') id: number, @Body() updateplanDto: UpdatePlanDto) {
    return this.planService.updateById(id, updateplanDto);
  }

  // @Get('/get/by-date')
  // @ApiOperation({ summary: 'Get revanue by date range' })
  // @ApiResponse({ status: 200, description: 'revanue retrieved successfully' })
  // @ApiResponse({ status: 400, description: 'Invalid date range' })
  // public async getMembersByDateRange(@Query() dateRangeDto: GetByDateDto) {
  //   console.log('Date range:', dateRangeDto);
  //   return await this.planService.getRevanueByDate(dateRangeDto);
  // }

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
