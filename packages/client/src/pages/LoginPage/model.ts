import { createEffect, createEvent, forward } from 'effector'
import { createGate } from 'effector-react'

import { checkIsNotAuthenticated } from '../../features/session'
import { paths } from '../../pages/paths'
import { pushHistoryFx } from '../../libs/history'
import { Provider, signIn } from '../../libs/firebase/auth'

export const login = createEvent<Provider>()

export const LoginGate = createGate()

const sessionCreateFx = createEffect(signIn)

checkIsNotAuthenticated({ when: LoginGate.open })

forward({ from: login, to: sessionCreateFx })
forward({ from: sessionCreateFx.done, to: pushHistoryFx.prepend(paths.boards) })
