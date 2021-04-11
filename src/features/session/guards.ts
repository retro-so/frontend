import { Unit, guard } from 'effector'

import { pushHistoryFx } from '../../libs/history'
import { paths } from '../../pages/paths'
import { $session } from './model';

const $isAuthenticated = $session.map((is) => is !== null)
const $isNotAuthenticated = $session.map((is) => is === null)

export function checkIsAuthenticated<T>({ when }: { when: Unit<T> }) {
  guard({
    source: when,
    // @ts-expect-error
    filter: $isNotAuthenticated,
    // @ts-expect-error
    target: pushHistoryFx.prepend(paths.login),
  })
}

export function checkIsNotAuthenticated<T>({ when }: { when: Unit<T> }) {
  guard({
    source: when,
    // @ts-expect-error
    filter: $isAuthenticated,
    // @ts-expect-error
    target: pushHistoryFx.prepend(paths.board),
  })
}
