import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, ID, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { AccessAuthGuard, GqlUser } from 'src/auth'
import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { CardsService } from './cards.service'

@UseGuards(AccessAuthGuard)
@Resolver(() => CardEntity)
export class CardsResolver {
  private pubsub: PubSub

  constructor(private cardsService: CardsService) {
    // TODO: Use channel from DI.
    this.pubsub = new PubSub()
  }

  @Mutation(() => CardEntity)
  async createCard(@GqlUser() user: UserEntity, @Args('card') cardData: CreateCardInput) {
    const card = await this.cardsService.createCard(cardData, user)
    this.pubsub.publish(CARD_CREATED, { cardCreated: card })

    return card
  }

  @Mutation(() => CardEntity)
  async updateCard(@Args('card') cardData: UpdateCardInput) {
    const card = await this.cardsService.updateCard(cardData)
    this.pubsub.publish(CARD_UPDATED, { cardUpdated: card })

    return card
  }

  @Mutation(() => CardEntity)
  async removeCard(@Args('id', { type: () => ID }) cardId: string) {
    const card = await this.cardsService.removeCard(cardId)
    this.pubsub.publish(CARD_REMOVED, { cardRemoved: card })

    return card
  }

  @Subscription(() => CardEntity, { filter: isSameBoard('cardCreated') })
  cardCreated(@Args('boardId', { type: () => ID }) _boardId: string) {
    return this.pubsub.asyncIterator(CARD_CREATED)
  }

  @Subscription(() => CardEntity, { filter: isSameBoard('cardUpdated') })
  cardUpdated(@Args('boardId', { type: () => ID }) _boardId: string) {
    return this.pubsub.asyncIterator(CARD_UPDATED)
  }

  @Subscription(() => CardEntity, { filter: isSameBoard('cardRemoved') })
  cardRemoved(@Args('boardId', { type: () => ID }) _boardId: string) {
    return this.pubsub.asyncIterator(CARD_REMOVED)
  }
}

const CARD_CREATED = 'CARD_CREATED'
const CARD_UPDATED = 'CARD_UPDATED'
const CARD_REMOVED = 'CARD_REMOVED'

function isSameBoard(key: string) {
  return (payload: any, variables: any) => {
    return payload[key].boardId === variables.boardId
  }
}
