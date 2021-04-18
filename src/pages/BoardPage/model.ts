import { createEffect, createEvent, createStore, forward } from 'effector'
import { createGate } from 'effector-react'

import { checkIsAuthenticated } from '../../features/session'
import { Board, loadBoard } from '../../api/board'

export const BoardGate = createGate<LoadBoardFxParams>()
export const $board = createStore<Board | null>(null)

const boardLoaded = createEvent<Board>()

// FIXME: Fix type name.
type LoadBoardFxParams = { id: string }
const loadBoardFx = createEffect((params: LoadBoardFxParams) => {
  loadBoard(params.id, boardLoaded)
})

// TODO: Reset data before page loaded.
// TODO: Handle not exists board.
$board.on(boardLoaded, (_, payload) => payload)

checkIsAuthenticated({ when: BoardGate.open })
forward({ from: BoardGate.open, to: loadBoardFx })
