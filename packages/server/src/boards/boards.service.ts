import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/users'
import { createShortLink } from 'src/libs/short-link'

import { BoardEntity } from './board.entity'
import { CreateBoardInput } from './board.input'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepo: Repository<BoardEntity>,
  ) {}

  // TODO: Reduce BoardEntity type for this query (without lists and cards).
  findAllByOwner(owner: UserEntity) {
    return this.boardRepo.find({ owner })
  }

  findOneByLink(link: string) {
    return this.boardRepo.findOne(
      { link },
      { relations: ['owner', 'lists', 'lists.cards'] },
    )
  }

  createBoard(boardData: CreateBoardInput, owner: UserEntity) {
    const shortLink = createShortLink()
    const entity = new BoardEntity({
      name: boardData.name,
      link: shortLink,
      owner,
    })

    return this.boardRepo.save(entity)
  }
}
