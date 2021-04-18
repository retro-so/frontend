import { createEffect, createEvent, forward, attach, createStore } from 'effector'
import { createGate } from 'effector-react'

import { $session, checkIsAuthenticated } from '../../features/session'
import { database } from '../../libs/firebase'
import { uuidv4 } from '../../libs/uuid'

export const BoardsGate = createGate()
export const boardCreate = createEvent<string>()
export const boardsLoaded = createEvent<Board[]>()

type Uuid = string
type Board = { name: string; id: Uuid }
export const $boards = createStore<Board[]>([])

const createBoardFx = attach<any, any, any>({
  source: $session,
  mapParams: (boardName, session) => ({ boardName, session }),
  effect: createEffect((params: any) => {
    const { boardName } = params
    // TODO: Generate short slug too.
    const uuid = uuidv4()

    // TODO: Move to API layer.
    database.ref(`users/${params.session.uid}/boards`).update({
      [boardName]: uuid,
    })

    database.ref(`boards/${uuid}`).update({
      boardName,
      settings: {
        shownLogins: true,
        shownContent: true,
      },
      columns: [{ name: 'Welcome', color: '#ccc' }],
    })
  }),
})

const fetchBoardsFx = attach<any, any, any>({
  source: $session,
  mapParams: (_, session) => ({ session }),
  effect: createEffect((params: any) => {
    // TODO: Move to API layer.
    // TODO: Save ref to store and detach after page close.
    database.ref(`users/${params.session.uid}/boards`).on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const boards = Object.entries<Uuid>(data).map(([name, id]) => ({ name, id }))
        boardsLoaded(boards)
      }
    })
  }),
})

$boards.on(boardsLoaded, (_, payload) => payload)

checkIsAuthenticated({ when: BoardsGate.open })
forward({ from: BoardsGate.open, to: fetchBoardsFx })
forward({ from: boardCreate, to: createBoardFx })
