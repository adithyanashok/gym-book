import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { UpdateMemberPlanDto } from './dtos/update-member-plan.dto';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { SearchMemberDto } from './dtos/search-member.dto';
import type { AuthenticatedRequest } from 'src/common/request/request';

@ApiBearerAuth()
@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  private readonly logger = new Logger(MembersController.name);
  // Create New Member
  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({
    status: 201,
    description: 'The member has been successfully created.',
    type: CreateMemberDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateMemberDto })
  public createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get('/get/by-date')
  @ApiOperation({ summary: 'Get members by date range' })
  @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid date range' })
  public async getMembersByDateRange(@Query() dateRangeDto: GetByDateDto) {
    console.log('Date range:', dateRangeDto);
    return await this.membersService.getMembersByDateRange(dateRangeDto);
  }

  // Search member
  @Get('/search')
  @ApiOperation({ summary: 'Search members' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async searchMembers(
    @Req() req: AuthenticatedRequest,
    @Query() searchMemberDto: SearchMemberDto,
  ) {
    console.log(req.user);
    return await this.membersService.searchMember(req.user['sub'], searchMemberDto);
  }

  // Get Member By Id
  @Get(':id')
  @ApiOperation({ summary: 'Get member by Id' })
  @ApiResponse({
    status: 201,
    description: 'Successfully fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public findById(@Param('id') id: number) {
    return this.membersService.findById(id);
  }

  // Update Member By Id
  @Patch(':id')
  @ApiOperation({ summary: 'Update member by Id' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public updateById(@Param('id') id: number, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.updateById(id, updateMemberDto);
  }

  // Renew Member Plan
  @Patch('/renew/:id')
  @ApiOperation({ summary: 'Renew member plan' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async updatePlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberPlanDto: UpdateMemberPlanDto,
  ) {
    return await this.membersService.updatePlan(id, updateMemberPlanDto);
  }

  // Get plan by current plan
  @Get('/plan/:planId')
  @ApiOperation({ summary: 'Get members by current plan' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Fetched',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async getMembersByCurrentPlan(@Param('planId', ParseIntPipe) id: number) {
    return await this.membersService.getMembersByCurrentPlan(id);
  }
}
