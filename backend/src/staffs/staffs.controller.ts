import { Body, Controller, Post } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('staffs')
export class StaffsController {
  constructor(
    /**
     * Injecting staffsService
     */
    private readonly staffsService: StaffsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new staff' })
  @ApiResponse({
    status: 201,
    description: 'Created staff {name} with phone {phone}',
  })
  @ApiResponse({ status: 400, description: 'User With {phone} already exists' })
  public async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }
}
