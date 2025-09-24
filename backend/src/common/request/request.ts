import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    phone: string;
    role: string;
    iat: number;
    exp: number;
  };
}
