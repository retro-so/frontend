import { Controller, UseGuards, Post, Delete, Body, Param, Patch } from '@nestjs/common'
import { HttpAuthGuard } from 'src/auth'
import { BoardsGateway } from 'src/boards/boards.gateway'

import { ListsService } from './lists.service'

@Controller('lists')
@UseGuards(HttpAuthGuard)
export class ListsController {
  constructor(private listsService: ListsService, private gateway: BoardsGateway) {}

  @Post()
  async create(@Body() listData: any) {
    const list = await this.listsService.createList(listData)
    this.gateway.publish('list:created', list)

    return list
  }

  @Delete(':id')
  async delete(@Param('id') listId: string) {
    const list = await this.listsService.removeList(listId)
    this.gateway.publish('list:deleted', list)

    return list
  }

  @Patch(':id')
  async update(@Body() listData: any) {
    const list = await this.listsService.updateList(listData)
    this.gateway.publish('list:updated', list)

    return list
  }
}
