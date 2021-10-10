type Override<T1, T2> = Omit<T1, keyof T2> & T2

export interface User {
  avatarUrl: string
  displayName: string
  email: string
  id: string
  login: string
  provider: string
}

export interface Card {
  author: User
  boardId: string
  content: string
  id: string
  index: number
  likes: any[]
  listId: string
  solved: boolean
}

export interface List {
  boardId: string
  cards: Card[]
  id: string
  index: number
  name: string
}

export interface Board {
  createdAt: string
  id: string
  link: string
  lists: List[]
  name: string
  owner: User
}

export interface NormalizedResponse {
  board: Record<Board['id'], Override<Board, { lists: List['id'][] }>>
  lists: Record<List['id'], Override<List, { cards: Card['id'][] }>>
  cards: Record<Card['id'], Card>
}
