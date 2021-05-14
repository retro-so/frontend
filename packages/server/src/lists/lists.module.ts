import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ListsResolver } from './lists.resolver'
import { ListsService } from './lists.service'
import { ListEntity } from './list.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity])],
  providers: [ListsService, ListsResolver],
})
export class ListsModule {}
