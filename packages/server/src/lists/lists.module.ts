import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BoardSubscriptionModule } from 'src/BoardSubscription/BoardSubscriptionModule'

import { ListsResolver } from './lists.resolver'
import { ListsService } from './lists.service'
import { ListEntity } from './list.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ListEntity]),
    // Use forwardRef for avoiding cycle deps.
    forwardRef(() => BoardSubscriptionModule)
  ],
  providers: [ListsService, ListsResolver],
})
export class ListsModule {}
