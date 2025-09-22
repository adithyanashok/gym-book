import { Module } from '@nestjs/common';
import { AmountsController } from './amounts.controller';
import { AmountsService } from './amounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amount } from './entities/amount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amount])],
  controllers: [AmountsController],
  providers: [AmountsService],
  exports: [AmountsService],
})
export class AmountsModule {}
