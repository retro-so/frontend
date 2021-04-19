import { attach, createEffect, createEvent, createStore, forward } from 'effector'
import { createGate } from 'effector-react'

import { $session, checkIsAuthenticated } from '../../features/session'
import type { Board } from '../../api/types'
import { loadBoard } from '../../api/board'
import { createCard, deleteCard } from '../../api/card'

export const BoardGate = createGate<LoadBoardFxParams>()
export const $board = createStore<Board | null>(null)

export const cardCreate = createEvent<{ columnId: string; content: string }>()
export const cardDelete = createEvent<{ columnId: string; cardId: string }>()
const boardLoaded = createEvent<Board>()

// FIXME: Fix type name.
type LoadBoardFxParams = { id: string }
const loadBoardFx = createEffect((params: LoadBoardFxParams) => {
  loadBoard(params.id, boardLoaded)
})

const createCardFx = attach({
  source: { session: $session, board: $board },
  mapParams: (data: any, { session, board }) => ({
    ...data,
    userId: session?.uid,
    boardId: board?.id,
  }),
  effect: createEffect((params: any) => {
    createCard(params)
  }),
})

const deleteCardFx = attach({
  source: { session: $session, board: $board },
  mapParams: (data: any, { session, board }) => ({
    ...data,
    userId: session?.uid,
    boardId: board?.id,
  }),
  effect: createEffect((params: any) => {
    deleteCard(params)
  }),
})


// TODO: Reset data before page loaded.
// TODO: Handle not exists board.
$board.on(boardLoaded, (_, payload) => payload)

checkIsAuthenticated({ when: BoardGate.open })
forward({ from: BoardGate.open, to: loadBoardFx })
forward({ from: cardCreate, to: createCardFx })
forward({ from: cardDelete, to: deleteCardFx })
