import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql'

import { GqlAuthGuard, GqlUser } from 'src/auth'
import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { CardsService } from './cards.service'

@UseGuards(GqlAuthGuard)
@Resolver(() => CardEntity)
export class CardsResolver {
  constructor(private cardsService: CardsService) {}

  @Mutation(() => CardEntity)
  createCard(@GqlUser() user: UserEntity, @Args('card') cardData: CreateCardInput) {
    return this.cardsService.createCard(cardData, user)
  }

  @Mutation(() => CardEntity)
  updateCard(@Args('card') cardData: UpdateCardInput) {
    return this.cardsService.updateCard(cardData)
  }

  @Mutation(() => String)
  removeCard(@Args('id', { type: () => ID }) cardId: string) {
    return this.cardsService.removeCard(cardId)
  }
}
