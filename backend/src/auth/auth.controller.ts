import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';

import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffsService } from 'src/staffs/staffs.service';
import { OtpVerifyDto } from './dtos/otp-verify.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting authService
     */
    private readonly authService: AuthService,

    /**
     * Injecting staffService
     */
    private readonly staffService: StaffsService,
  ) {}

  @Public()
  @Post('/otp')
  @ApiOperation({
    summary: 'Send login OTP for staff login',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP send successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  public staffLoginOtp(@Body() signinDto: SignInDto) {
    return this.staffService.staffLoginOtp(signinDto.phoneNumber);
  }

  @Public()
  @Post('/otp-verify')
  @ApiOperation({
    summary: 'Verify OTP',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP send successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  public verifyOTP(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.staffService.staffOtpVerify(otpVerifyDto);
  }

  @ApiBearerAuth()
  @Post('/logout')
  @ApiOperation({
    summary: 'Logout user',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async logout(@Req() request: Request) {
    const token = this.extractTokenFromHeader(request);
    return this.staffService.logout(token);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
