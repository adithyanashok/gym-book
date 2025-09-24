import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { RenewMembershipDto } from './dtos/renew-membership.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('membership')
export class MembershipController {
  constructor(
    /**
     * Injecting membershipService
     */
    private readonly membershipService: MembershipService,
  ) {}

  @Patch('/renew/:id')
  @ApiOperation({ summary: 'Renew membership' })
  @ApiResponse({
    status: 200,
    description: 'Membership Renewed!',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async updatePlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() renewMembershipDto: RenewMembershipDto,
  ) {
    return await this.membershipService.renew(id, renewMembershipDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get membership of a member' })
  @ApiResponse({
    status: 200,
    description: 'Membership Fetched Successfully!',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async getMembership(@Param('id', ParseIntPipe) id: number) {
    return await this.membershipService.getMemberships(id);
  }
}
