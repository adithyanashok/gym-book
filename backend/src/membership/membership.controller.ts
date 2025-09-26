import { Body, Controller, Get, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { RenewMembershipDto } from './dtos/renew-membership.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { AuthenticatedRequest } from 'src/common/request/request';

@Controller('membership')
export class MembershipController {
  constructor(
    /**
     * Injecting membershipService
     */
    private readonly membershipService: MembershipService,
  ) {}

  @Patch('/renew')
  @ApiOperation({ summary: 'Renew membership' })
  @ApiResponse({
    status: 200,
    description: 'Membership Renewed!',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async updatePlan(
    @Req() req: AuthenticatedRequest,
    @Body() renewMembershipDto: RenewMembershipDto,
  ) {
    console.log(renewMembershipDto);
    return await this.membershipService.renew(req.user['sub'], renewMembershipDto);
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
