import { database } from '../libs/firebase'
import { uuidv4 } from '../libs/uuid'
import type { Column } from './types'

const refs = {
  column: ({ boardId, columnId }: any) =>
    `boards/${boardId}/columns/${columnId}`,
}

export function createColumn(params: { boardId: string; name: string }) {
  // FIXME: Move to the entity such as Card.
  const column: Column = {
    id: uuidv4(),
    name: params.name,
    color: '#fff',
  }

  return database
    .ref(refs.column({ boardId: params.boardId, columnId: column.id }))
    .set(column)
}
