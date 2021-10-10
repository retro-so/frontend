import { Injectable } from '@nestjs/common'

import { UserEntity } from 'src/users'

// import { ActiveUser } from './ActiveUser'

interface ActiveUserEntity extends Pick<UserEntity, 'id' | 'displayName' | 'avatarUrl'> {}

// TODO: Use redis or database in future for avoid problems with few instance.
@Injectable()
export class ActiveUserRepository {
  // private store: Map<string, Map<string, ActiveUserEntity>> = new Map()
  private store = {}

  // predicate as arg
  findOne(boardId: string) {
    return [{ fake: 'true2' }]
    // const board = this.store.get(boardId)
    // if (!board) {
    //   return []
    // }
    // return Array.from(board.values())
  }

  create(user: ActiveUserEntity, boardId: string, socketId: string) {
    if (this.store[user.id]) {
      this.store[user.id][boardId].push(socketId)
    } else {
      this.store[user.id] = { [boardId]: [socketId] }
      // const user = {
      //   id: user.id,
      //   displayName: user.displayName,
      //   avatarUrl: user.avatarUrl,
      // }
      // return user
    }
  }

  delete() {}

  // save(conditions: { boardId: string; user: ActiveUser }) {
  //   const { boardId, user } = conditions
  //   const users = this.store.get(boardId) || new Map<string, ActiveUser>()
  //   users.set(user.id, user)
  //   this.store.set(boardId, users)
  // }
  // delete(conditions: { boardId: string; user: ActiveUser }) {
  //   const { boardId, user } = conditions
  //   const users = this.store.get(boardId)
  //   if (!users) {
  //     return
  //   }
  //   users.delete(user.id)
  //   if (users.size === 0) {
  //     this.store.delete(boardId)
  //   } else {
  //     this.store.set(boardId, users)
  //   }
  // }
}
