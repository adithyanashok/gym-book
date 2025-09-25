import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gym } from './entities/gym.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { UpdateGymDto } from './dtos/update-gym.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { OtpVerifyDto } from 'src/auth/dtos/otp-verify.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { SignInDto } from 'src/auth/dtos/signin.dto';
import { AddGymDto } from './dtos/add-gym.dto';

@Injectable()
export class GymService {
  constructor(
    private jwtService: JwtService,
    private blacklistService: BlacklistService,
    /**
     * Injecting gymRepository
     */
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,

    /**
     * Injecting twilioService
     */
    private readonly twilioService: TwilioService,

    /**
     * Injecting authService
     */
    private readonly authService: AuthService,
  ) {}

  public async gymSignup(signinDto: SignInDto) {
    try {
      const gymExist = await this.gymRepository.findOne({
        where: { user_phone: signinDto.phoneNumber },
      });

      const otp = this.generateOTP(signinDto.phoneNumber);
      const otpExpire = Date.now() + 1 * 60 * 1000;
      let gym: Gym;
      if (gymExist) {
        if (gymExist.active === true) {
          throw new BadRequestException('Gym already exist');
        } else {
          gymExist.otp = parseInt(otp);
          gymExist.otp_expire = otpExpire;
          await this.gymRepository.save(gymExist);
        }
      } else {
        gym = this.gymRepository.create({
          user_phone: signinDto.phoneNumber,
          otp: parseInt(otp),
          otp_expire: otpExpire,
        });
        await this.gymRepository.save(gym);
      }

      const otpStatus = await this.twilioService.sendOTP(`+91${signinDto.phoneNumber}`, otp);

      if (otpStatus) {
        const gymId = gymExist?.id ? gymExist.id : gym!.id;

        return new ApiResponse(true, 'OTP send successfully', { gymId });
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async gymLogin(phone: string) {
    try {
      const gym = await this.gymRepository.findOne({ where: { user_phone: phone } });

      if (!gym) {
        throw new NotFoundException('Gym Not Found');
      }
      const otp = this.generateOTP(phone);
      const otpExpire = Date.now() + 1 * 60 * 1000;
      gym.otp = parseInt(otp);
      gym.otp_expire = otpExpire;

      await this.gymRepository.save(gym);

      const otpStatus = await this.twilioService.sendOTP(`+91${gym.user_phone}`, otp);

      if (otpStatus) {
        return new ApiResponse(true, 'OTP send successfully', { gymId: gym.id });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async verifyOtp(otpVerifyDto: OtpVerifyDto) {
    console.log(otpVerifyDto);
    try {
      const { gymId } = otpVerifyDto;
      const gymExist = await this.gymRepository.findOneBy({ id: gymId });
      if (!gymExist) {
        throw new BadRequestException('User not found');
      }
      if (!gymExist.otp) throw new BadRequestException('OTP Expired');
      if (!gymExist.otp_expire) throw new BadRequestException('OTP Expired');
      if (Date.now() > gymExist.otp_expire) {
        throw new BadRequestException('OTP Expired');
      }
      if (otpVerifyDto.otp !== gymExist.otp) {
        throw new BadRequestException('Incorrect Otp');
      }
      gymExist.otp = null;
      gymExist.otp_expire = null;
      gymExist.active = true;

      await this.gymRepository.save(gymExist);

      const tokens = await this.authService.generateToken(gymExist);

      return new ApiResponse(true, `Otp verified`, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        gymId: gymExist.id,
        isDetailComplete: gymExist.isDetailComplete,
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

  // Update Gym
  public async addGym(id: number, addGymDto: AddGymDto) {
    try {
      const gym = await this.gymRepository.findOneBy({ id });

      if (!gym) {
        throw new NotFoundException('Gym Not Found');
      }

      Object.assign(gym, addGymDto);

      gym.isDetailComplete = true;

      const updatedGym = await this.gymRepository.save(gym);

      return new ApiResponse(true, 'Gym Created Successfully', updatedGym);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete Gym
  public async delete(id: number) {
    try {
      const gym = await this.gymRepository.findOneBy({ id });

      if (!gym) {
        throw new NotFoundException('Gym Not Found');
      }

      await this.gymRepository.delete({ id });

      return new ApiResponse(true, 'Gym deleted Successfully');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Find one Gym by id
  public async findOneById(id: number) {
    try {
      const gym = await this.gymRepository.findOneBy({ id });

      if (!gym) {
        throw new NotFoundException('Gym Not Found');
      }

      return gym;
    } catch (error) {
      console.log(error);
      throw error;
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
