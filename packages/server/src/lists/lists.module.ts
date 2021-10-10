import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BoardsModule } from 'src/boards/boards.module'

import { ListsService } from './lists.service'
import { ListEntity } from './list.entity'
import { ListsController } from './lists.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([ListEntity]),
    // Use forwardRef for avoiding cycle deps.
    forwardRef(() => BoardsModule),
  ],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
