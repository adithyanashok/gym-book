import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    /**
     * Injecting reflector
     */
    private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLE_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const req: Request = context.switchToHttp().getRequest();

    const user = req['user'];

    return roles.includes(user.role);
  }
}
