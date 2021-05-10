import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'

import { AppModule } from 'src/app'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.disable('x-powered-by')
  app.use(cookieParser())
  app.setGlobalPrefix('/api/v1')

  await app.listen(3100)
}

bootstrap()
