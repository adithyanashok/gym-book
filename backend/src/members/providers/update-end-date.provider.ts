import { Injectable } from '@nestjs/common';
import { addMonths, addYears } from 'date-fns';
import { PlanType } from 'src/plans/enums/plan.enum';

@Injectable()
export class UpdateEndDateProvider {
  public updateEndDate(stardDate: Date, planDuration: number) {
    const startDate = new Date(stardDate);
    return addMonths(startDate, planDuration);
  }
}
