import { ListEntity } from './list.entity'

export class CreateListInput implements Partial<ListEntity> {
  name: string
  boardId: string
}

export class UpdateListInput implements Partial<ListEntity> {
  id: string
  name: string
}
