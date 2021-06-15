import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql'

import { AccessAuthGuard } from 'src/auth'
import { BoardSubscriptionService, ListCreated, ListRemoved, ListUpdated } from 'src/BoardSubscription'

import { ListEntity } from './list.entity'
import { CreateListInput, UpdateListInput } from './list.input'
import { ListsService } from './lists.service'

@UseGuards(AccessAuthGuard)
@Resolver(() => ListEntity)
export class ListsResolver {
  constructor(
    private listsService: ListsService,
    private boardSubscriptionService: BoardSubscriptionService,
  ) {}

  @Mutation(() => ListEntity)
  async createList(@Args('list') listData: CreateListInput) {
    const list = await this.listsService.createList(listData)
    await this.boardSubscriptionService.publish(ListCreated, list)

    return list
  }

  @Mutation(() => ListEntity)
  async updateList(@Args('list') listData: UpdateListInput) {
    const list = await this.listsService.updateList(listData)
    await this.boardSubscriptionService.publish(ListUpdated, list)

    return list
  }

  @Mutation(() => ListEntity)
  async removeList(@Args('listId', { type: () => ID }) listId: string) {
    const list = await this.listsService.removeList(listId)
    await this.boardSubscriptionService.publish(ListRemoved, list)

    return list
  }
}
