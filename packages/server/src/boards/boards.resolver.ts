import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'

import { GqlUser, GqlAuthGuard } from 'src/auth'
import { UserEntity } from 'src/users'

import { CreateBoardInput } from './board.input'
import { BoardEntity } from './board.entity'
import { BoardsService } from './boards.service'

@UseGuards(GqlAuthGuard)
@Resolver(() => BoardEntity)
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => [BoardEntity])
  boards(@GqlUser() user: UserEntity) {
    return this.boardsService.findAllByOwner(user)
  }

  @Query(() => BoardEntity)
  board(@Args('id', { type: () => ID }) id: string) {
    return this.boardsService.findOneById(id)
  }

  @Mutation(() => BoardEntity)
  createBoard(@GqlUser() user: UserEntity, @Args('board') board: CreateBoardInput) {
    return this.boardsService.createBoard(board, user)
  }
}
