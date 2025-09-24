import { Controller, Get, Query, Req } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { AuthenticatedRequest } from 'src/common/request/request';

@ApiBearerAuth()
@Controller('statistics')
export class StatisticsController {
  constructor(
    /**
     * Injecting statisticsService
     */
    private readonly statisticsService: StatisticsService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Statistics by date' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async getStatisticsByDate(
    @Req() req: AuthenticatedRequest,
    @Query() dateDto: GetByDateDto,
  ) {
    return this.statisticsService.getMonthlyStatistics(dateDto, req.user['sub']);
  }
}
