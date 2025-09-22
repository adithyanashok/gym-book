import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import * as jwtConfigNS from '../config/jwt.config';
import jwtConfig from '../config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';

type JwtPayload = {
  sub: string;
  phone: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    /**
     * Injecting jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret!,
    });
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
