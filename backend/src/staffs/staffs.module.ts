import { forwardRef, Module } from '@nestjs/common';
import { StaffsController } from './staffs.controller';
import { StaffsService } from './staffs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    RedisModule,
  ],
  controllers: [StaffsController],
  providers: [StaffsService, TwilioService, BlacklistService],
  exports: [StaffsService],
})
export class StaffsModule {}
