import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { UserEntity } from 'src/users'

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    return ctx.switchToHttp().getRequest().user
  },
)

export const GqlUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    return GqlExecutionContext.create(ctx).getContext().req.user
  },
)
