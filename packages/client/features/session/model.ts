import { forward, createStore, createEffect, restore } from 'effector'
import { useStore, createGate } from 'effector-react'

import { api } from '../../shared/api'
import type { User } from '../../shared/api'

const fetchSessionFx = createEffect(api.fetchMe)

export const AppGate = createGate()

export const $session = createStore<User | null>(null)
export const $isLoading = restore(fetchSessionFx.pending.updates, true)

$session.on(fetchSessionFx.doneData, (_, result) => result)

export function useUser(): User {
  return useStore($session)!
}

forward({ from: AppGate.open, to: fetchSessionFx })
