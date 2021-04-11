import { FC } from 'react'
import { useGate, useStore } from 'effector-react'

import { BoardGate } from './model'
import { $session } from '../../features/session'

export const BoardPage: FC = () => {
  useGate(BoardGate)
  const session = useStore($session)

  return (
    <div>
      Board page
      <div>Hello, {session?.displayName || 'Anonymous'}</div>
    </div>
  )
}
