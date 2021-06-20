import { Injectable } from '@nestjs/common'

import { ActiveUser } from './ActiveUser'

// TODO: Use redis or database in future for avoid problems with few instance.
@Injectable()
export class ActiveUserRepository {
  private store: Map<string, Map<string, ActiveUser>>

  constructor() {
    this.store = new Map()
  }

  findOne(boardId: string) {
    const board = this.store.get(boardId)

    if (!board) {
      return []
    }

    return Array.from(board.values())
  }

  save(conditions: { boardId: string; user: ActiveUser }) {
    const { boardId, user } = conditions
    const users = this.store.get(boardId) || new Map<string, ActiveUser>()

    users.set(user.id, user)
    this.store.set(boardId, users)
  }

  delete(conditions: { boardId: string; user: ActiveUser }) {
    const { boardId, user } = conditions
    const users = this.store.get(boardId)

    if (!users) {
      return
    }

    users.delete(user.id)

    if (users.size === 0) {
      this.store.delete(boardId)
    } else {
      this.store.set(boardId, users)
    }
  }
}
