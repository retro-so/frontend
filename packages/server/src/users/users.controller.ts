import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from 'src/auth/user.decorator'
import { HttpAuthGuard } from 'src/auth'

import { UserEntity } from './user.entity'

@Controller('users')
@UseGuards(HttpAuthGuard)
export class UsersController {
  @Get('me')
  me(@User() user: UserEntity) {
    return user
  }
}
