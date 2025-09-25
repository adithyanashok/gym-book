import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';

import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffsService } from 'src/staffs/staffs.service';
import { OtpVerifyDto } from './dtos/otp-verify.dto';
import type { Request } from 'express';
import { GymService } from 'src/gym/gym.service';

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

    /**
     * Injecting gymService
     */
    private readonly gymService: GymService,
  ) {}

  @Public()
  @Post('/signup/otp')
  @ApiOperation({
    summary: 'Send OTP for Signup',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP send successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  public gymSignupLogin(@Body() signinDto: SignInDto) {
    return this.gymService.gymSignup(signinDto);
  }

  @Public()
  @Post('/login/otp')
  @ApiOperation({
    summary: 'Send OTP for login',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP send successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  public gymSigninLogin(@Body() signinDto: SignInDto) {
    return this.gymService.gymLogin(signinDto.phoneNumber);
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
    return this.gymService.verifyOtp(otpVerifyDto);
  }

  @ApiBearerAuth()
  @Post('/logout')
  @ApiOperation({
    summary: 'Logout Gym',
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
    return this.gymService.logout(token);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
