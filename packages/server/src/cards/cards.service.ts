import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'
import { CreateCardInput } from './card.input'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepo: Repository<CardEntity>,
  ) {}

  createCard(cardData: CreateCardInput, author: UserEntity) {
    return this.cardRepo.save({ ...cardData, author })
  }
}
