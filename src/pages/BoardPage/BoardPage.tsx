import { FC, useState } from 'react'
import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router'

import { Column } from '../../components/Column'
import { BoardRouteParams } from '../paths'
import { $board, BoardGate, cardCreate, cardDelete, columnCreate } from './model'

export const BoardPage: FC = () => {
  const params = useParams<BoardRouteParams>()
  useGate(BoardGate, { id: params.id })
  const board = useStore($board)

  const [columnName, setColumnName] = useState('')

  if (!board) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>{board.boardName}</div>
      <hr />
      <div>Users: ...</div>
      <hr />
      <div>
        <button
          onClick={() => {
            columnCreate({ name: columnName })
            setColumnName('')
          }}
        >
          Create column
        </button>
        <input onChange={(event) => setColumnName(event.target.value)} value={columnName} />
      </div>
      <hr />
      <div style={{ display: 'flex' }}>
        {Object.entries(board.columns).map(([_, column]) => (
          <Column key={column.id} {...column} cardCreate={cardCreate} cardDelete={cardDelete} />
        ))}
      </div>
    </div>
  )
}
