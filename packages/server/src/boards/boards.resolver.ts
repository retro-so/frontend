import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { GqlUser, AccessAuthGuard } from 'src/auth'
import { UserEntity } from 'src/users'

import { CreateBoardInput } from './board.input'
import { BoardEntity } from './board.entity'
import { BoardsService } from './boards.service'

@UseGuards(AccessAuthGuard)
@Resolver(() => BoardEntity)
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => [BoardEntity])
  boards(@GqlUser() user: UserEntity) {
    return this.boardsService.findAllByOwner(user)
  }

  @Query(() => BoardEntity)
  board(@Args('boardLink') boardLink: string) {
    return this.boardsService.findOneByLink(boardLink)
  }

  @Mutation(() => BoardEntity)
  createBoard(@GqlUser() user: UserEntity, @Args('board') board: CreateBoardInput) {
    return this.boardsService.createBoard(board, user)
  }
}
