import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserEntity } from 'src/users'

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest()

    return request.user
  },
)
