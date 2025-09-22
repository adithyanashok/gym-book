import { StaffsService } from 'src/staffs/staffs.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import * as jwtConfigNS from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { Staff } from 'src/staffs/entities/staff.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting staffsService
     */
    private readonly staffsService: StaffsService,

    /**
     * Injecting jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting Jwt Config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfigNS.default>,
  ) {}
  private async signToken<T>(userId: number, expiresIn: number, payload?: T): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfig.secret,
        expiresIn: expiresIn,
      },
    );
  }

  public async generateToken(staff: Staff) {
    const [accessToken, refreshToken] = await Promise.all([
      // Access Token
      this.signToken(staff.id, this.jwtConfig.jwtAccessTokenTTL, {
        phone: staff.phone,
        role: staff.role,
      }),

      // Refresh Token
      this.signToken(staff.id, this.jwtConfig.jwtRefreshTokenTTL),
    ]);

    return { accessToken, refreshToken };
  }
}
