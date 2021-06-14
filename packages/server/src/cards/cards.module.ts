import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BoardSubscriptionModule } from 'src/BoardSubscription/BoardSubscriptionModule'

import { CardsResolver } from './cards.resolver'
import { CardsService } from './cards.service'
import { CardEntity } from './card.entity'
import { LikeEntity } from './LikeEntity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity, LikeEntity]),
    // Use forwardRef for avoiding cycle deps.
    forwardRef(() => BoardSubscriptionModule),
  ],
  providers: [CardsService, CardsResolver],
})
export class CardsModule {}
