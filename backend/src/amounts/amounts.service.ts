import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Amount } from './entities/amount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/plans/entities/plan.entity';

@Injectable()
export class AmountsService {
  constructor(
    /**
     * Injecting amountsRepository
     */
    @InjectRepository(Amount)
    private readonly amountsRepository: Repository<Amount>,
  ) {}

  public async addAmount(amount: Plan) {
    try {
      const createdAmount = this.amountsRepository.create(amount);
      console.log(createdAmount);
      await this.amountsRepository.save(createdAmount);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
