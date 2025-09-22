import { SetMetadata } from '@nestjs/common';
export const ROLE_KEY = 'roles';
export const WithRole = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);
