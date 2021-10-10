import { Controller, UseGuards, Post, Delete, Body, Param, Patch } from '@nestjs/common'
import { HttpAuthGuard, User } from 'src/auth'
import { BoardsGateway } from 'src/boards/boards.gateway'

import { CardsService } from './cards.service'

@Controller('cards')
@UseGuards(HttpAuthGuard)
export class CardsController {
  constructor(private cardsService: CardsService, private gateway: BoardsGateway) {}

  @Post()
  async create(@Body() cardData: any, @User() user: any) {
    const card = await this.cardsService.createCard(cardData, user)
    this.gateway.publish('card:created', card)

    return card
  }

  @Delete(':id')
  async delete(@Param('id') cardId: string) {
    const card = await this.cardsService.removeCard(cardId)
    this.gateway.publish('card:deleted', card)

    return card
  }

  @Patch(':id')
  async update(@Body() cardData: any) {
    const card = await this.cardsService.updateCard(cardData)
    this.gateway.publish('card:updated', card)

    return card
  }
}
