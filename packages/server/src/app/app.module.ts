import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PostgresModule } from 'src/libs/postgres'
import { AuthModule } from 'src/auth'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    PostgresModule,
    AuthModule,
  ],
})
export class AppModule {}
