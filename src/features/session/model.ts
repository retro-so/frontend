import { createStore, createEvent } from 'effector'

import { auth } from '../../libs/firebase/auth'
import type { MaybeSession } from './types'

export function readyToLoadSession() {
  return new Promise<void>((resolve) => {
    auth.onAuthStateChanged((session) => {
      sessionChange(session)
      resolve()
    })
  })
}

export const $session = createStore<MaybeSession>(null)

const sessionChange = createEvent<MaybeSession>()

$session.on(sessionChange, (_, payload) => payload)
