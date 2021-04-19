import { database } from '../libs/firebase'
import { uuidv4 } from '../libs/uuid'
import type { Maybe } from '../libs/utility-types'
import type { Board, Card } from './types'

const refs = {
  card: ({ boardId, columnId, cardId }: any) =>
    `boards/${boardId}/columns/${columnId}/cards/${cardId}`,
  board: ({ boardId }: any) => `boards/${boardId}`,
}

type CreateCardParams = {
  content: string
  boardId: string
  columnId: string
  userId: string
}

/**
 * A method create card to the board.
 */
export function createCard(params: CreateCardParams) {
  const card: Card = {
    id: uuidv4(),
    content: params.content,
    author: {
      uid: params.userId,
    },
  }

  return database
    .ref(refs.card({ boardId: params.boardId, columnId: params.columnId, cardId: card.id }))
    .set(card)
}

type DeleteCardParams = {
  boardId: string
  columnId: string
  userId: string
  cardId: string
}

/**
 * A method deletes card from the board.
 * Cards can be delete only card author or board owner
 */
export async function deleteCard(params: DeleteCardParams): Promise<void> {
  const boardRef = database.ref(refs.board({ boardId: params.boardId }))
  const cardRef = database.ref(
    refs.card({ boardId: params.boardId, columnId: params.columnId, cardId: params.cardId }),
  )

  const card: Maybe<Card> = (await cardRef.get()).val()
  const board: Maybe<Board> = (await boardRef.get()).val()

  if (!card || !board) {
    return Promise.reject()
  }

  if (card.author.uid !== params.userId && board.author.uid !== params.userId) {
    return Promise.reject()
  }

  return cardRef.remove()
}
