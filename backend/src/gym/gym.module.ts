import { Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gym } from './entities/gym.entity';

@Module({
  controllers: [GymController],
  providers: [GymService],
  imports: [TypeOrmModule.forFeature([Gym])],
})
export class GymModule {}
