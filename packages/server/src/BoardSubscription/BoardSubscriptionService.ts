import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

const BOARD_UPDATE = 'BOARD_UPDATE'
export const EVENT_KEY = 'boardUpdated'

@Injectable()
export class BoardSubscriptionService {
  private pubSub: PubSub

  constructor() {
    // TODO: Use channel from DI.
    this.pubSub = new PubSub()
  }

  publish(action: any, payload: any): Promise<void> {
    return this.pubSub.publish(BOARD_UPDATE, { [EVENT_KEY]: { action, payload } })
  }

  subscribe() {
    return this.pubSub.asyncIterator(BOARD_UPDATE)
  }
}
