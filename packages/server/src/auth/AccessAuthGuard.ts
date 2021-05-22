import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import cookie from 'cookie'

@Injectable()
export class AccessAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    if (req.headers.cookie) {
      req.cookies = cookie.parse(req.headers.cookie)
    } else {
      req.cookies = {}
    }

    return req
  }
}
