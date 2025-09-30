import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StaffsModule } from 'src/staffs/staffs.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { RedisModule } from 'src/redis/redis.module';
import { GymModule } from 'src/gym/gym.module';

@Module({
  imports: [
    RedisModule,
    forwardRef(() => GymModule),
    forwardRef(() => StaffsModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => GymModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy, BlacklistService],
  exports: [AuthService, BlacklistService],
})
export class AuthModule {}
