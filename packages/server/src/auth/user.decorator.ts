import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'src/users'

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserEntity => {
  return ctx.switchToHttp().getRequest().user
})
