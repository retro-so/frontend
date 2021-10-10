import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/users'

import { ActiveUserRepository } from './active-users.repository'

@Injectable()
export class ActiveUsersService {
  constructor(private activeUsersRepo: ActiveUserRepository) {}

  findAllByBoard(boardId: string) {
    return this.activeUsersRepo.findOne(boardId)
  }

  addUserToBoard(socketId: string, boardId: string, user: UserEntity) {
    return this.activeUsersRepo.create(user, boardId, socketId)
  }

  removeUserFromBoard(user: UserEntity, boardId: string) {}
}
