import { createEffect, createEvent, forward, attach, createStore } from 'effector'
import { createGate } from 'effector-react'

import { $session, checkIsAuthenticated } from '../../features/session'
import { database } from '../../libs/firebase'

export const BoardsGate = createGate()
export const boardCreate = createEvent<string>()

export const $boards = createStore([])

const createBoardFx = attach<any, any, any>({
  source: $session,
  mapParams: (boardName, session) => ({ boardName, session }),
  effect: createEffect((params: any) => {
    database.ref(`users/${params.session.uid}/boards`).update({
      [params.boardName]: true,
    })
  }),
})

const fetchBoardsFx = attach<any, any, any>({
  source: $session,
  mapParams: (_, session) => ({ session }),
  effect: createEffect((params: any) => {
    database.ref(`users/${params.session.uid}/boards`).on('value', (snapshot) => {
      const value = snapshot.val()
      console.log('>>> value', value)
    })
  }),
})

checkIsAuthenticated({ when: BoardsGate.open })
forward({ from: BoardsGate.open, to: fetchBoardsFx })
forward({ from: boardCreate, to: createBoardFx })
