import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UserEntity } from './user.entity'
import { UsersResolver } from './users.resolver'

@Module({
  providers: [UsersService, UsersResolver],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UsersModule {}
