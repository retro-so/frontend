import { resolve } from 'path'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export function getPostgresConfig(configService: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',

    database: configService.get('POSTGRES_DB'),
    host: configService.get('DATABASE_HOST'),
    password: configService.get('POSTGRES_PASSWORD'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('POSTGRES_USER'),

    // TODO: Resolve project root.
    entities: [resolve(__dirname, '../../**/*.entity{.ts,.js}')],

    // TODO: Disable for production.
    synchronize: true,
    migrations: [resolve(__dirname, '../../migrations/**/*{.ts,.js}')],

    cli: {
      migrationsDir: 'src/migrations',
    },
  }
}

export const PostgresModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: getPostgresConfig,
})
