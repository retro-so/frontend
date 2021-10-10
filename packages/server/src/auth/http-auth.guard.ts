import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import cookie from 'cookie'

@Injectable()
export class HttpAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()

    if (req.headers.cookie) {
      req.cookies = cookie.parse(req.headers.cookie)
    } else {
      req.cookies = {}
    }

    return req
  }
}
