import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('statistics')
export class StatisticsController {
  constructor(
    /**
     * Injecting statisticsService
     */
    private readonly statisticsService: StatisticsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Statistics by date' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async getStatisticsByDate(@Query() dateDto: GetByDateDto) {
    return this.statisticsService.getMonthlyStatistics(dateDto);
  }
}
