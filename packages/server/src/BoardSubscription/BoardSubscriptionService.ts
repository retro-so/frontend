import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

import { UserEntity } from 'src/users'
import { withCancelSubscribe } from 'src/libs/with-cancel-subscribe'

import { UserConnected, UserDisconnected } from './BoardSubscriptionTypes2'
import { ActiveUserRepository } from './ActiveUserRepository'
import { ActiveUser } from './ActiveUser'

const BOARD_UPDATE = 'BOARD_UPDATE'
export const EVENT_KEY = 'boardUpdated'

@Injectable()
export class BoardSubscriptionService {
  private pubSub: PubSub

  constructor(private activeUserRepository: ActiveUserRepository) {
    // TODO: Use channel from DI.
    this.pubSub = new PubSub()
  }

  publish(action: any, payload: any): Promise<void> {
    return this.pubSub.publish(BOARD_UPDATE, { [EVENT_KEY]: { action, payload } })
  }

  subscribe() {
    return this.pubSub.asyncIterator(BOARD_UPDATE)
  }

  findActiveUsers(boardId: string) {
    return this.activeUserRepository.findOne(boardId)
  }

  connectionSubscribe(user: UserEntity, boardId: string) {
    const TRIGGER = 'CONNECTION_UPDATED'

    const userData: ActiveUser = {
      id: user.id,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    }

    // Use setImmediate for publish event in next tick.
    setImmediate(() => {
      this.activeUserRepository.save({ boardId, user: userData })

      this.pubSub.publish(TRIGGER, {
        connectionUpdated: { action: UserConnected, payload: userData },
      })
    })

    return withCancelSubscribe(this.pubSub.asyncIterator(TRIGGER), () => {
      this.activeUserRepository.delete({ boardId, user })

      this.pubSub.publish(TRIGGER, {
        connectionUpdated: { action: UserDisconnected, payload: { id: userData.id } },
      })
    })
  }
}
