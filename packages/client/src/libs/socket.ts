import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

let socket: Socket | null = null

export function createSocketConnection(): Socket {
  socket = io('http://localhost:3200', {
    transports: ['websocket'],
    path: '/api/v1',
  })

  return socket
}

export function getSocketConnection(): Socket {
  // TODO: Return ensure connection
  // @ts-expect-error
  return socket
}
