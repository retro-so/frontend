import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from 'src/users'
import { JwtPayload } from './types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.access]),
      secretOrKey: '3bcd7273-58e1-4fd6-86b1-be590938630a',
    })
  }

  validate(payload: JwtPayload) {
    // Takes user from database instead payload cuz user profile can be changed.
    return this.usersService.findOneById(payload.id)
  }
}
