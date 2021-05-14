import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

import { UsersService } from 'src/users'
import { JwtPayload } from './types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private usersService: UsersService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.access]),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    })
  }

  validate(payload: JwtPayload) {
    // Takes user from database instead payload cuz user profile can be changed.
    return this.usersService.findOneById(payload.id)
  }
}
