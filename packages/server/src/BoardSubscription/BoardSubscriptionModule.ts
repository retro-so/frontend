import { Module } from '@nestjs/common'

import { BoardSubscriptionResolver } from './BoardSubscriptionResolver'
import { BoardSubscriptionService } from './BoardSubscriptionService'

@Module({
  providers: [BoardSubscriptionService, BoardSubscriptionResolver],
  exports: [BoardSubscriptionService],
})
export class BoardSubscriptionModule {}
