import { UseGuards } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WsAuthGuard } from 'src/auth'
import { ActiveUsersService } from './active-users.service'

@WebSocketGateway(3200, { path: '/api/v1' })
@UseGuards(WsAuthGuard)
export class BoardsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  // TODO: Store all connections in database.
  private connections = {}

  // constructor(private activeUsersService: ActiveUsersService) {}

  publish(action: any, payload: any) {
    this.server.to(payload.boardId).emit(action, payload)
  }

  findActiveUsers(boardId: string) {
    // console.log('>>> boardId', boardId)
    // console.log('>>> this.connections', this.connections)
  }

  handleDisconnect(socket: Socket) {
    if (!socket.data.user || !socket.data.boardId) {
      // TODO: Add to log this case.
      return
    }

    const boardId = socket.data.boardId
    const userId = socket.data.user.id

    const socketIds = this.connections[userId][boardId]
    const nextSocketIds = socketIds.filter((socketId) => socketId !== socket.id)

    if (nextSocketIds.length === 0) {
      this.server.to(boardId).emit('board:leaved', { id: userId })
    }

    this.connections[userId][boardId] = nextSocketIds
  }

  @SubscribeMessage('board:join')
  join(socket: Socket, boardId: string) {
    socket.join(boardId)
    socket.data.boardId = boardId

    // this.activeUsersService.addUserToBoard(socket.id, socket.data.boardId, socket.data.user)

    if (this.connections[socket.data.user.id]) {
      this.connections[socket.data.user.id][boardId].push(socket.id)
    } else {
      this.connections[socket.data.user.id] = { [boardId]: [socket.id] }

      const user = {
        id: socket.data.user.id,
        displayName: socket.data.user.displayName,
        avatarUrl: socket.data.user.avatarUrl,
      }

      this.server.to(boardId).emit('board:joined', user)
    }
  }

  @SubscribeMessage('board:leave')
  leave(socket: Socket) {
    const boardId = socket.data.boardId
    const userId = socket.data.user.id

    socket.leave(boardId)
    socket.data.boardId = undefined

    this.server.to(boardId).emit('board:leaved', { id: userId })
  }
}
