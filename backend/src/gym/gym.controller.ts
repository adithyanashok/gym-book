import { Body, Controller, Delete, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dtos/create-gym.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateGymDto } from './dtos/update-gym.dto';

@Controller('gym')
export class GymController {
  constructor(
    /**
     * Injecting gymService
     */
    private readonly gymService: GymService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create gym' })
  @ApiResponse({
    status: 201,
    description: 'Gym Created Successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async create(@Body() createGymDto: CreateGymDto) {
    return await this.gymService.create(createGymDto);
  }

  @Public()
  @Patch()
  @ApiOperation({ summary: 'Update gym' })
  @ApiResponse({
    status: 201,
    description: 'Gym updated Successfully',
  })
  @ApiResponse({ status: 404, description: 'Gym not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async update(@Query('id', ParseIntPipe) id: number, @Body() updateGymDto: UpdateGymDto) {
    return await this.gymService.update(id, updateGymDto);
  }

  @Public()
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
}
