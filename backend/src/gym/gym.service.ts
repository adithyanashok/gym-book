import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gym } from './entities/gym.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGymDto } from './dtos/create-gym.dto';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { UpdateGymDto } from './dtos/update-gym.dto';

@Injectable()
export class GymService {
  constructor(
    /**
     * Injecting gymRepository
     */
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
  ) {}

  // Create New Gym
  public async create(createGymDto: CreateGymDto) {
    try {
      const gym = this.gymRepository.create(createGymDto);

      const savedGym = await this.gymRepository.save(gym);

      return new ApiResponse(true, 'Gym Created Successfully', savedGym);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update Gym
  public async update(id: number, updateGymDto: UpdateGymDto) {
    try {
      const gym = await this.gymRepository.findOneBy({ id });

      if (!gym) {
        throw new NotFoundException('Gym Not Found');
      }

      Object.assign(gym, updateGymDto);

      const updatedGym = await this.gymRepository.save(gym);

      return new ApiResponse(true, 'Gym updated Successfully', updatedGym);
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
}
