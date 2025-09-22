import { Injectable } from '@nestjs/common';
import { differenceInCalendarDays } from 'date-fns';

@Injectable()
export class GetExpiration {
  getDaysUntilExpiration(endDate: Date | string): number {
    // Convert string dates to Date objects if needed
    const expirationDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
    const currentDate = new Date();

    const expiresIn = differenceInCalendarDays(expirationDate, currentDate);
    if (expiresIn < 0) {
      return 0;
    }
    return expiresIn;
  }
}
