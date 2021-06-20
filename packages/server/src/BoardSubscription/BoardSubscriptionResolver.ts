import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Subscription, ID } from '@nestjs/graphql'

import { AccessAuthGuard, GqlUser } from 'src/auth'
import { UserEntity } from 'src/users'

import { EVENT_KEY, BoardSubscriptionService } from './BoardSubscriptionService'
import { BoardUpdated } from './BoardSubscriptionTypes'
import { ConnectionUpdate } from './BoardSubscriptionTypes2'
import { ActiveUser } from './ActiveUser'

@UseGuards(AccessAuthGuard)
@Resolver()
export class BoardSubscriptionResolver {
  constructor(private boardSubscriptionService: BoardSubscriptionService) {}

  @Query(() => [ActiveUser])
  boardActiveUsers(@Args('boardId', { type: () => ID }) boardId: string) {
    return this.boardSubscriptionService.findActiveUsers(boardId)
  }

  @Subscription(() => BoardUpdated, {
    filter: (payload, variables) => payload[EVENT_KEY].payload.boardId === variables.boardId,
  })
  boardUpdated(@Args('boardId', { type: () => ID }) _boardId: string) {
    return this.boardSubscriptionService.subscribe()
  }

  @Subscription(() => ConnectionUpdate)
  connectionUpdated(
    @Args('boardId', { type: () => ID }) boardId: string,
    @GqlUser() user: UserEntity,
  ) {
    return this.boardSubscriptionService.connectionSubscribe(user, boardId)
  }
}
