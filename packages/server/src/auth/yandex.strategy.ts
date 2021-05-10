import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Profile, Strategy } from 'passport-yandex'

import { UsersService } from 'src/users'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(configService: ConfigService, private usersService: UsersService) {
    super({
      clientID: configService.get('YANDEX_CLIENT_ID'),
      clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
      callbackURL: configService.get('YANDEX_CALLBACK_URL'),
    })
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    return this.usersService.findOneOrCreate({
      displayName: profile.displayName,
      email: profile.emails?.[0].value,
      provider: profile.provider,
      login: profile.username,
      avatarUrl: profile.photos?.[0].value,
    })
  }
}
