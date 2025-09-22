import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { RevanueService } from './revanue.service';
@ApiBearerAuth()
@Controller('revanue')
export class RevanueController {
  constructor(
    /**
     * Injecting revanueService
     */
    private readonly revanueService: RevanueService,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get revanue by date range' })
  @ApiResponse({ status: 200, description: 'revanue retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid date range' })
  public async getMembersByDateRange(@Query() dateRangeDto: GetByDateDto) {
    console.log('Date range:', dateRangeDto);
    return await this.revanueService.getRevanueByDate(dateRangeDto);
  }
}
