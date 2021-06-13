import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { PostgresModule } from 'src/libs/postgres'
import { AuthModule } from 'src/auth'
import { BoardsModule } from 'src/boards'
import { ListsModule } from 'src/lists'
import { CardsModule } from 'src/cards'
import { BoardSubscriptionModule } from 'src/BoardSubscription'

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
      subscriptions: {
        path: '/api/v1/subscriptions',
        // Passes request from handshake to context.
        onConnect: (_params, _ws, ctx) => ({ req: ctx.request }),
      },
      context: ({ req, connection }) => {
        // Extracts request from ws connection.
        if (connection) {
          return { req: connection.context.req }
        }
        return { req }
      },
      autoSchemaFile: join(process.cwd(), 'src/compiled/schema.gql'),
      installSubscriptionHandlers: true,
      useGlobalPrefix: true,
      playground: true,
    }),
    BoardsModule,
    ListsModule,
    CardsModule,
    BoardSubscriptionModule,
  ],
})
export class AppModule {}
