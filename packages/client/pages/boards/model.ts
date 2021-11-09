import { createStore, createEffect, forward, restore, createEvent } from 'effector'
import { createGate } from 'effector-react'

import { api } from '../../shared/api'

export const createBoard = createEvent<any>()

const fetchBoardsFx = createEffect(api.fetchBoards)
const createBoardFx = createEffect(api.createBoard)

export const BoardsPageGate = createGate<string>()

export const $boards = createStore<any>([])
export const $isLoading = restore(fetchBoardsFx.pending.updates, true)

$boards
  .on(fetchBoardsFx.doneData, (_, boards) => boards)
  .on(createBoardFx.doneData, (boards, board) => [...boards, board])
  .reset(BoardsPageGate.open)

forward({ from: BoardsPageGate.open, to: fetchBoardsFx })
forward({ from: createBoard, to: createBoardFx })
