import { Injectable } from '@nestjs/common';
import { addMonths, addYears } from 'date-fns';
import { PlanType } from 'src/plans/enums/plan.enum';

@Injectable()
export class UpdateEndDateProvider {
  public updateEndDate(stardDate: Date, planName: PlanType) {
    const startDate = new Date(stardDate);
    if (planName === PlanType.MONTHLY) {
      return addMonths(startDate, 1);
    } else if (planName === PlanType.QUARTERLY) {
      return addMonths(startDate, 3);
    } else if (planName === PlanType.YEARLY) {
      return addYears(startDate, 1);
    }
  }
}
