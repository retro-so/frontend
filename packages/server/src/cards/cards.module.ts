import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CardsResolver } from './cards.resolver'
import { CardsService } from './cards.service'
import { CardEntity } from './card.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [CardsService, CardsResolver],
})
export class CardsModule {}
