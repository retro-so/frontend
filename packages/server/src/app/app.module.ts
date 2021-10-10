import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PostgresModule } from 'src/libs/postgres'
import { AuthModule } from 'src/auth'
import { BoardsModule } from 'src/boards'
import { ListsModule } from 'src/lists'
import { CardsModule } from 'src/cards'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    PostgresModule,
    AuthModule,
    BoardsModule,
    ListsModule,
    CardsModule,
  ],
})
export class AppModule {}
