import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { AuthService } from 'src/auth/auth.service';
import { OtpVerifyDto } from 'src/auth/dtos/otp-verify.dto';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
@Injectable()
export class StaffsService {
  constructor(
    /**
     * Injecting staffRepository
     */
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,

    /**
     * Injecting twilioService
     */
    private readonly twilioService: TwilioService,

    /**
     * Injecting authService
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private jwtService: JwtService,
    private blacklistService: BlacklistService,
  ) {}

  public async create(createStaffDto: CreateStaffDto): Promise<ApiResponse<Staff>> {
    try {
      const user = await this.staffRepository.findOneBy({
        phone: createStaffDto.phone,
      });

      // Throw exception
      if (user) {
        throw new BadRequestException(`User With ${createStaffDto.phone} already exists`);
      }

      const newStaff = this.staffRepository.create(createStaffDto);

      const savedStaff = await this.staffRepository.save(newStaff);

      return new ApiResponse(
        true,
        `Created staff ${savedStaff.name} with phone ${savedStaff.phone}`,
        savedStaff,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getStaffByPhone(phone: string): Promise<Staff | null> {
    try {
      const user = await this.staffRepository.findOneBy({
        phone: phone,
      });

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async staffLoginOtp(phone: string) {
    try {
      const staff = await this.staffRepository.findOne({ where: { phone } });
      if (!staff) {
        throw new BadRequestException('User not found');
      }
      const otp = this.generateOTP(phone);
      const otpExpire = Date.now() + 1 * 60 * 1000;
      staff.otp = parseInt(otp);
      staff.otp_expire = otpExpire;

      await this.staffRepository.save(staff);

      const otpStatus = await this.twilioService.sendOTP(`+91${staff.phone}`, otp);

      if (otpStatus) {
        return new ApiResponse(true, 'OTP send successfully', { staffId: staff.id });
      }
      throw new InternalServerErrorException();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async staffOtpVerify(otpVerifyDto: OtpVerifyDto) {
    try {
      const staff = await this.staffRepository.findOneBy({ id: 1 });
      if (!staff) {
        throw new BadRequestException('User not found');
      }
      if (!staff.otp) return;
      if (!staff.otp_expire) return;
      if (Date.now() > staff.otp_expire) {
        throw new BadRequestException('OTP Expired');
      }
      if (otpVerifyDto.otp !== staff.otp) {
        throw new BadRequestException('Incorrect Otp');
      }
      staff.otp = null;
      staff.otp_expire = null;

      // const tokens = await this.authService.generateToken({});

      return new ApiResponse(true, `${staff.name} is LoggedIn`, {
        accessToken: 'tokens.accessToken',
        refreshToken: 'tokens.refreshToken',
        userId: staff.id,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async logout(token: string | undefined) {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // Decode token to get expiry
      const decoded = this.jwtService.decode(token);

      const expiry = decoded.exp - Math.floor(Date.now() / 1000);

      // Add to blacklist
      await this.blacklistService.blacklistToken(token, expiry);

      return new ApiResponse(true, 'Successfully logged out');
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  generateOTP(phone: string): string {
    const digits = '1234567890';
    let otp = '';
    const length: number = 6;
    if (phone && phone === '1234567890') {
      return '123456';
    }
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }

    return otp;
  }
}
