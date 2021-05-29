import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'
import { CreateCardInput, UpdateCardInput } from './card.input'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepo: Repository<CardEntity>,
  ) {}

  createCard(cardData: CreateCardInput, author: UserEntity) {
    return this.cardRepo.save({ ...cardData, author })
  }

  async updateCard(cardData: UpdateCardInput) {
    const card = await this.cardRepo.findOne(
      { id: cardData.id },
      { loadRelationIds: { relations: ['boardId', 'listId'] }, relations: ['author'] },
    )
    const nextCard = Object.assign(card, cardData)

    return this.cardRepo.save(nextCard)
  }

  async removeCard(cardId: string) {
    const card = await this.cardRepo.findOne(
      { id: cardId },
      { loadRelationIds: { relations: ['boardId', 'listId'] } },
    )
    await this.cardRepo.delete(card)

    return card
  }
}
