import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { GqlAuthGuard, GqlUser } from 'src/auth'
import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'
import { CreateCardInput } from './card.input'
import { CardsService } from './cards.service'

@UseGuards(GqlAuthGuard)
@Resolver(() => CardEntity)
export class CardsResolver {
  constructor(private listsService: CardsService) {}

  @Mutation(() => CardEntity)
  createCard(@GqlUser() user: UserEntity, @Args('card') card: CreateCardInput) {
    return this.listsService.createCard(card, user)
  }
}
