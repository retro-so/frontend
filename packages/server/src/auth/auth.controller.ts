import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { UserEntity } from 'src/users'
import { User } from './user.decorator'
import { Meta } from './meta.decorator'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  yandex() {}

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexCallback(@Res() res: Response, @User() user: UserEntity, @Meta() meta: Meta) {
    const access = await this.authService.generateAccessToken(user)
    const refresh = await this.authService.generateRefreshToken(user, meta)

    return res
      .cookie('access', access.token, {
        expires: new Date(access.expiresIn),
        httpOnly: true,
        path: '/api/v1',
      })
      .cookie('refresh', refresh.token, {
        expires: new Date(refresh.expiresIn),
        httpOnly: true,
        path: '/api/v1/auth/refresh',
      })
      .json(user)
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.revokeRefreshToken(req.cookies.refresh)

    return res
      .clearCookie('access', { path: '/api/v1' })
      .clearCookie('refresh', { path: '/api/v1/auth/refresh' })
      .end()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@User() user: UserEntity) {
    return user
  }
}
