import { forwardRef, Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gym } from './entities/gym.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [GymController],
  providers: [GymService, TwilioService, BlacklistService],
  imports: [
    TypeOrmModule.forFeature([Gym]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    RedisModule,
  ],
  exports: [GymService],
})
export class GymModule {}
