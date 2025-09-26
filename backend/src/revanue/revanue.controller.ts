import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { RevanueService } from './revanue.service';
import type { AuthenticatedRequest } from 'src/common/request/request';
@ApiBearerAuth()
@Controller('revanue')
export class RevanueController {
  constructor(
    /**
     * Injecting revanueService
     */
    private readonly revanueService: RevanueService,
  ) {}
  @Get('/')
  @ApiOperation({ summary: 'Get revanue by date range' })
  @ApiResponse({ status: 200, description: 'revanue retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid date range' })
  public async getMembersByDateRange(
    @Req() req: AuthenticatedRequest,
    @Query() dateRangeDto: GetByDateDto,
  ) {
    return await this.revanueService.getRevanueByDate(dateRangeDto, req.user['sub']);
  }
}
