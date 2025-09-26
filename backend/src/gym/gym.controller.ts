import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Query, Req } from '@nestjs/common';
import { GymService } from './gym.service';
import { AddGymDto } from './dtos/add-gym.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import type { AuthenticatedRequest } from 'src/common/request/request';

@Controller('gym')
@ApiBearerAuth()
export class GymController {
  constructor(
    /**
     * Injecting gymService
     */
    private readonly gymService: GymService,
  ) {}

  @Patch()
  @ApiOperation({ summary: 'Update gym' })
  @ApiResponse({
    status: 201,
    description: 'Gym updated Successfully',
  })
  @ApiResponse({ status: 404, description: 'Gym not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async update(@Req() req: AuthenticatedRequest, @Body() addGymDto: AddGymDto) {
    return await this.gymService.addGym(req.user['sub'], addGymDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete gym' })
  @ApiResponse({
    status: 201,
    description: 'Gym deleted Successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Gym not found.' })
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.gymService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get gym' })
  @ApiResponse({
    status: 200,
    description: 'Gym Fetched Successfully',
  })
  @ApiResponse({ status: 404, description: 'Gym not found.' })
  public async get(@Req() req: AuthenticatedRequest) {
    return await this.gymService.getGym(req.user['sub']);
  }
}
