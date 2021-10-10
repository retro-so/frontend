import { createStore, createEffect, restore } from 'effector'
import { useStore } from 'effector-react'

import { api } from '../../api'
import type { User } from '../../api'

const fetchSessionFx = createEffect(api.fetchMe)

export const $session = createStore<User | null>(null)
export const $isLoading = restore(fetchSessionFx.pending.updates, true)

$session.on(fetchSessionFx.doneData, (_, result) => result)

export function loadSession(fn: () => void) {
  fetchSessionFx.done.watch(fn)
  fetchSessionFx()
}

export function useUser(): User {
  return useStore($session)!
}
