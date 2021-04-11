import { createEffect } from 'effector'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const pushHistoryFx = createEffect((path: string) => history.push(path))
