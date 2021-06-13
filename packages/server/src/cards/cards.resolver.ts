import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql'

import { AccessAuthGuard, GqlUser } from 'src/auth'
import { UserEntity } from 'src/users'
import {
  BoardSubscriptionService,
  CardCreated,
  CardUpdated,
  CardRemoved,
  CardLikeAdded,
  CardLikeRemoved,
} from 'src/BoardSubscription'

import { CardEntity, CardId } from './card.entity'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { CardsService } from './cards.service'
import { AddCardLikeInput } from './LikeInput'

@UseGuards(AccessAuthGuard)
@Resolver(() => CardEntity)
export class CardsResolver {
  constructor(
    private cardsService: CardsService,
    private boardSubscriptionService: BoardSubscriptionService,
  ) {}

  @Mutation(() => CardEntity)
  async createCard(@GqlUser() user: UserEntity, @Args('card') cardData: CreateCardInput) {
    const card = await this.cardsService.createCard(cardData, user)
    await this.boardSubscriptionService.publish(CardCreated, card)
    return card
  }

  @Mutation(() => CardEntity)
  async updateCard(@Args('card') cardData: UpdateCardInput) {
    const card = await this.cardsService.updateCard(cardData)
    await this.boardSubscriptionService.publish(CardUpdated, card)
    return card
  }

  @Mutation(() => CardEntity)
  async removeCard(@Args('id', { type: () => ID }) cardId: string) {
    const card = await this.cardsService.removeCard(cardId)
    await this.boardSubscriptionService.publish(CardRemoved, card)
    return card
  }

  @Mutation(() => Boolean)
  async addCardLike(
    @Args('like') likeData: AddCardLikeInput,
    @GqlUser() user: UserEntity,
  ) {
    const like = await this.cardsService.addCardLike(likeData, user)
    await this.boardSubscriptionService.publish(CardLikeAdded, like)
    return true
  }

  @Mutation(() => Boolean)
  async removeCardLike(
    @Args('cardId', { type: () => ID }) cardId: CardId,
    @GqlUser() user: UserEntity,
  ) {
    const like = await this.cardsService.removeCardLike(cardId, user)
    await this.boardSubscriptionService.publish(CardLikeRemoved, like)
    return true
  }
}
