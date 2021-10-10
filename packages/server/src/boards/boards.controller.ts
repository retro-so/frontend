import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common'
import { HttpAuthGuard, User } from 'src/auth'
import { UserEntity } from 'src/users'

import { ActiveUsersService } from './active-users.service'
import { BoardsGateway } from './boards.gateway'

import { BoardsService } from './boards.service'

@Controller('boards')
@UseGuards(HttpAuthGuard)
export class BoardsController {
  constructor(
    private boardsService: BoardsService,
    private activeUsersService: ActiveUsersService,
    private boardsGateway: BoardsGateway,
  ) {}

  @Get()
  getBoards(@User() user: UserEntity) {
    return this.boardsService.findAllByOwner(user)
  }

  @Get(':link')
  getBoard(@Param('link') link: string) {
    return this.boardsService.findOneByLink(link)
  }

  @Get(':link/users')
  getBoardUsers(@Param('link') link: string) {
    // return this.activeUsersService.findAllByBoard(link)
    return this.boardsGateway.findActiveUsers(link)
  }

  @Post()
  createBoard(@User() user: UserEntity, @Body() boardData: any) {
    return this.boardsService.createBoard(boardData, user)
  }
}
