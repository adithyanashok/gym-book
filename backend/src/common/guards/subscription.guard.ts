import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CheckLimitProvider } from '../providers/check-limit.provider';
import { AuthenticatedRequest } from '../request/request';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly checkLimitProvider: CheckLimitProvider) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const active = await this.checkLimitProvider.hasSubscription(request.user['sub']);
    console.log(active);
    if (!active) {
      throw new HttpException({ message: 'Subscription Expired', code: 403 }, HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
