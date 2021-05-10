import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { getTimeFromNow } from 'src/libs/time'
import { UserEntity } from 'src/users'
import { RefreshTokenEntity } from './refresh-token.entity'
import { Meta } from './meta.decorator'
import { JwtPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepo: Repository<RefreshTokenEntity>,
  ) {}

  async generateAccessToken(user: UserEntity) {
    const expiresIn = getTimeFromNow(this.configService.get('ACCESS_TOKEN_EXPIRATION'))
    const token = await this.jwtService.signAsync({ id: user.id } as JwtPayload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn,
    })

    return { token, expiresIn }
  }

  async generateRefreshToken(user: UserEntity, meta: Meta) {
    const userTokens = await this.refreshTokenRepo.count({ userId: user.id })

    if (userTokens >= this.configService.get('MAX_REFRESH_SESSIONS')) {
      await this.refreshTokenRepo.delete({ userId: user.id })
    }

    const expiresIn = getTimeFromNow(this.configService.get('REFRESH_TOKEN_EXPIRATION'))
    const token = await this.jwtService.signAsync({ id: user.id } as JwtPayload, {
      secret: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
      expiresIn,
    })

    const newToken = new RefreshTokenEntity({
      expiresIn,
      ip: meta.ip,
      token,
      userAgent: meta.userAgent,
      userId: user.id,
    })

    await this.refreshTokenRepo.save(newToken)

    return { token, expiresIn }
  }

  async revokeRefreshToken(token: string) {
    return this.refreshTokenRepo.delete({ token })
  }
}
