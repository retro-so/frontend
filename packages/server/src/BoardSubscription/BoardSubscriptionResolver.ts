import { Resolver, Args, Subscription, ID } from '@nestjs/graphql'

import { EVENT_KEY, BoardSubscriptionService } from './BoardSubscriptionService'
import { BoardUpdated } from './BoardSubscriptionTypes'

@Resolver()
export class BoardSubscriptionResolver {
  constructor(private boardSubscriptionService: BoardSubscriptionService) {}

  @Subscription(() => BoardUpdated, {
    filter: (payload, variables) => payload[EVENT_KEY].payload.boardId === variables.boardId,
  })
  boardUpdated(@Args('boardId', { type: () => ID }) _boardId: string) {
    return this.boardSubscriptionService.subscribe()
  }
}
