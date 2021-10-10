import { CardEntity } from './card.entity'

export class CreateCardInput implements Partial<CardEntity> {
  content: string
  listId: string
  boardId: string
}

export class UpdateCardInput implements Partial<CardEntity> {
  id: string
  content?: string
  solved?: boolean
}
