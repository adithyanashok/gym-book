import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest(error, user) {
    if (error || !user) {
      throw new ForbiddenException('Access denied');
    }
    return user;
  }
}
