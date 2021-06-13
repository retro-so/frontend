import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/users'

import { CardEntity, CardId } from './card.entity'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { LikeEntity } from './LikeEntity'
import { AddCardLikeInput } from './LikeInput'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepo: Repository<CardEntity>,
    @InjectRepository(LikeEntity)
    private likeRepo: Repository<LikeEntity>,
  ) {}

  async createCard(cardData: CreateCardInput, author: UserEntity) {
    const entity = new CardEntity({
      content: cardData.content,
      listId: cardData.listId,
      boardId: cardData.boardId,
      author: author,
      likes: [],
    })

    await entity.save()

    return entity
  }

  async addCardLike(likeData: AddCardLikeInput, author: UserEntity) {
    // TODO: Get boardId from databas instead client.
    const like = await this.likeRepo.findOne({
      authorId: author.id,
      cardId: likeData.cardId,
      boardId: likeData.boardId,
    })

    if (!like) {
      const likeEntity = new LikeEntity({
        authorId: author.id,
        cardId: likeData.cardId,
        boardId: likeData.boardId,
      })
      await likeEntity.save()

      return likeEntity
    }

    return like
  }

  async removeCardLike(cardId: CardId, author: UserEntity) {
    const like = await this.likeRepo.findOne({ authorId: author.id, cardId })

    if (!like) {
      // TODO: Add validation.
      throw new Error('')
    }

    if (like && like.authorId !== author.id) {
      // TODO: Add validation for author.
      throw new Error('')
    }

    await like.remove()

    return like
  }

  async updateCard(cardData: UpdateCardInput) {
    const card = await this.cardRepo.findOne(
      { id: cardData.id },
      { relations: ['author', 'likes'] },
    )
    const nextCard = Object.assign(card, cardData)

    return this.cardRepo.save(nextCard)
  }

  async removeCard(cardId: string) {
    const card = await this.cardRepo.findOne({ id: cardId })
    await this.cardRepo.delete(card)

    return card
  }
}
