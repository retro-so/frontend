import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BoardsModule } from 'src/boards/boards.module'

import { CardsService } from './cards.service'
import { CardEntity } from './card.entity'
import { LikeEntity } from './LikeEntity'
import { CardsController } from './cards.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity, LikeEntity]),
    // Use forwardRef for avoiding cycle deps.
    forwardRef(() => BoardsModule),
  ],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
