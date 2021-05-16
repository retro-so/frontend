import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

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
    GraphQLModule.forRoot({
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      autoSchemaFile: join(process.cwd(), 'src/compiled/schema.gql'),
      useGlobalPrefix: true,
    }),
    BoardsModule,
    ListsModule,
    CardsModule,
  ],
})
export class AppModule {}
