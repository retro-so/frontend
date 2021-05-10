import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type Meta = { ip: string; userAgent: string }

export const Meta = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Meta => {
    const request = ctx.switchToHttp().getRequest()
    const ip = (request as any).ip
    const userAgent = request.headers['user-agent']

    return { ip, userAgent }
  },
)
