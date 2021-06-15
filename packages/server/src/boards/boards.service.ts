import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/users'

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

  findOneById(id: string) {
    return this.boardRepo.findOne(
      { id },
      { relations: ['owner', 'lists', 'lists.cards'] },
    )
  }

  createBoard(boardData: CreateBoardInput, owner: UserEntity) {
    return this.boardRepo.save({ ...boardData, owner })
  }
}
