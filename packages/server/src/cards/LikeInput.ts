import { LikeEntity } from './LikeEntity'

export class AddCardLikeInput implements Partial<LikeEntity> {
  cardId: string
  boardId: string
}
