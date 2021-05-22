import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, ID, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { AccessAuthGuard, GqlUser } from 'src/auth'
import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { CardsService } from './cards.service'

const CARD_CREATED = 'CARD_CREATED'

@UseGuards(AccessAuthGuard)
@Resolver(() => CardEntity)
export class CardsResolver {
  private channel: PubSub

  constructor(private cardsService: CardsService) {
    // TODO: Use channel from DI.
    this.channel = new PubSub()
  }

  @Mutation(() => CardEntity)
  async createCard(@GqlUser() user: UserEntity, @Args('card') cardData: CreateCardInput) {
    const card = await this.cardsService.createCard(cardData, user)
    this.channel.publish(CARD_CREATED, { cardCreated: card })
    return card
  }

  @Mutation(() => CardEntity)
  updateCard(@Args('card') cardData: UpdateCardInput) {
    return this.cardsService.updateCard(cardData)
  }

  @Mutation(() => String)
  removeCard(@Args('id', { type: () => ID }) cardId: string) {
    return this.cardsService.removeCard(cardId)
  }

  @Subscription(() => CardEntity, {
    filter: (payload, variables) => payload.cardCreated.boardId === variables.boardId,
  })
  cardCreated(@Args('boardId', { type: () => ID }) _boardId: string) {
    return this.channel.asyncIterator(CARD_CREATED)
  }
}
