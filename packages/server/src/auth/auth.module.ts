import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'src/users'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { YandexStrategy } from './yandex.strategy'
import { AuthService } from './auth.service'
import { RefreshTokenEntity } from './refresh-token.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, YandexStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
