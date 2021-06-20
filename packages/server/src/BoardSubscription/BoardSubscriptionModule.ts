import { Module } from '@nestjs/common'

import { BoardSubscriptionResolver } from './BoardSubscriptionResolver'
import { BoardSubscriptionService } from './BoardSubscriptionService'
import { ActiveUserRepository } from './ActiveUserRepository'

@Module({
  providers: [BoardSubscriptionService, BoardSubscriptionResolver, ActiveUserRepository],
  exports: [BoardSubscriptionService],
})
export class BoardSubscriptionModule {}
