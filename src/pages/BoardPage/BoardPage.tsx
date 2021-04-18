import { FC } from 'react'
import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router'

import { $board, BoardGate } from './model'

// TODO: Move this type to paths file.
type RouteParams = { id: string }

export const BoardPage: FC = () => {
  const params = useParams<RouteParams>()
  useGate(BoardGate, { id: params.id })
  const board = useStore($board)

  if (!board) {
    return <div>Loading...</div>
  }

  return <div>
    <div>
      {board.boardName}
    </div>
    <div>
      {board.columns.map((column) => (
        <div key={column.name}>
          {column.name}
        </div>
      ))}
    </div>
  </div>
}
