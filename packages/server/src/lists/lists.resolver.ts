import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { AccessAuthGuard } from 'src/auth'

import { ListEntity } from './list.entity'
import { CreateListInput } from './list.input'
import { ListsService } from './lists.service'

@UseGuards(AccessAuthGuard)
@Resolver(() => ListEntity)
export class ListsResolver {
  constructor(private listsService: ListsService) {}

  @Mutation(() => ListEntity)
  createList(@Args('list') list: CreateListInput) {
    return this.listsService.createList(list)
  }
}
