import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { GetByDateDto } from 'src/common/dtos/get-by-date.dto';
import { SearchMemberDto } from './dtos/search-member.dto';
import type { AuthenticatedRequest } from 'src/common/request/request';
import { SubscriptionGuard } from 'src/common/guards/subscription.guard';

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
  @UseGuards(SubscriptionGuard)
  public createMember(@Req() req: AuthenticatedRequest, @Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(req.user['sub'], createMemberDto);
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
  @UseGuards(SubscriptionGuard)
  public updateById(@Param('id') id: number, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.updateById(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete member by Id' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(SubscriptionGuard)
  public deleteById(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    return this.membersService.deleteById(req.user['sub'], id);
  }

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
