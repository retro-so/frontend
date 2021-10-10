import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BoardsService } from './boards.service'
import { BoardEntity } from './board.entity'
import { BoardsController } from './boards.controller'
import { BoardsGateway } from './boards.gateway'
import { ActiveUsersService } from './active-users.service'
import { ActiveUserRepository } from './active-users.repository'

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardsService, ActiveUserRepository, ActiveUsersService, BoardsGateway],
  controllers: [BoardsController],
  exports: [BoardsGateway],
})
export class BoardsModule {}
