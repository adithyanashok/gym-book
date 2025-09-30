import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import * as jwtConfigNS from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Gym } from 'src/gym/entities/gym.entity';

@Injectable()
export class AuthService {
  constructor(
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

  public async generateToken(gym: Gym) {
    const [accessToken, refreshToken] = await Promise.all([
      // Access Token
      this.signToken(gym.id, this.jwtConfig.jwtAccessTokenTTL, {
        phone: gym.user_phone,
        role: gym.role,
      }),

      // Refresh Token
      this.signToken(gym.id, this.jwtConfig.jwtRefreshTokenTTL),
    ]);

    return { accessToken, refreshToken };
  }

  public async refreshTokens(refreshToken: string) {
    try {
      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtConfig.secret,
      });

      // Check if it's a refresh token
      if (!payload.isRefreshToken) {
        throw new UnauthorizedException('Invalid token type');
      }

      const gym = {
        id: payload.sub,
        user_phone: payload.phone,
        role: payload.role,
      } as Gym;

      // Generate new tokens
      return await this.generateToken(gym);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
