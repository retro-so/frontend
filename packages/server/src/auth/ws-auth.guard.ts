import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Socket } from 'socket.io'
import cookie from 'cookie'

@Injectable()
export class WsAuthGuard extends AuthGuard('jwt') {
  private socket: any

  getRequest(context: ExecutionContext) {
    if (context.getType() === 'ws') {
      this.socket = context.getArgByIndex(0)
    }

    const client = context.switchToWs().getClient<Socket>()
    const req = { cookies: {}, headers: client.handshake.headers }

    if (req.headers.cookie) {
      req.cookies = cookie.parse(req.headers.cookie)
    }

    return req
  }

  handleRequest(error, user) {
    if (error || !user) {
      throw error || new UnauthorizedException()
    }

    this.socket.data.user = user

    return user
  }
}
