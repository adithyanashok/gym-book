import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { AddGymDto } from './dtos/add-gym.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { AuthenticatedRequest } from 'src/common/request/request';
import { UpdateGymDto } from './dtos/update-gym.dto';

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
  @ApiOperation({ summary: 'Add gym' })
  @ApiResponse({
    status: 201,
    description: 'Gym Created Successfully',
  })
  @ApiResponse({ status: 404, description: 'Gym not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async create(@Req() req: AuthenticatedRequest, @Body() addGymDto: AddGymDto) {
    return await this.gymService.addGym(req.user['sub'], addGymDto);
  }

  @Patch('/update')
  @ApiOperation({ summary: 'Update gym' })
  @ApiResponse({
    status: 201,
    description: 'Gym Updated Successfully',
  })
  @ApiResponse({ status: 404, description: 'Gym not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async update(@Req() req: AuthenticatedRequest, @Body() updateGymDto: UpdateGymDto) {
    return await this.gymService.editGym(req.user['sub'], updateGymDto);
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

  @Post('logout')
  @ApiOperation({ summary: 'Logout gym user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async logout(@Req() req: AuthenticatedRequest) {
    const authHeader = req.headers['authorization'];
    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;
    return await this.gymService.logout(token);
  }
}
