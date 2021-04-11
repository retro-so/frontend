import { createGate } from 'effector-react'

import { checkIsAuthenticated } from '../../features/session'

export const BoardGate = createGate()

checkIsAuthenticated({ when: BoardGate.open })
