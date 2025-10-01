import { Injectable } from '@nestjs/common';
import { addMonths } from 'date-fns';

@Injectable()
export class UpdateEndDateProvider {
  public updateEndDate(stardDate: Date, planDuration: number) {
    const startDate = new Date(stardDate);
    return addMonths(startDate, planDuration);
  }
}
