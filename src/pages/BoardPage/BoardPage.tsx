import { FC, useState } from 'react'
import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router'

import { BoardRouteParams } from '../paths'
import { $board, BoardGate, cardCreate, cardDelete } from './model'

export const BoardPage: FC = () => {
  const params = useParams<BoardRouteParams>()
  useGate(BoardGate, { id: params.id })
  const board = useStore($board)

  const [value, setValue] = useState('')
  const [isCreatorMode, setCreatorMode] = useState(false)

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
        {Object.entries(board.columns).map(([_, column]) => (
          <div key={column.name}>
            {column.name}
            <div>
              {isCreatorMode && (
                <div>
                  <textarea value={value} onChange={(event) => setValue(event.target.value)} />
                  <button
                    onClick={() =>
                      cardCreate({ content: value, columnId: column.id }) && setCreatorMode(false)
                    }
                  >
                    Create
                  </button>
                  <button onClick={() => setCreatorMode(false)}>Cancel</button>
                </div>
              )}
            </div>
            <div>
              {column.cards && Object.entries(column.cards).map(([_, card]) => (
                <div key={card.id}>
                  {card.content}
                  <div>
                    Author, {card.author.uid}
                  </div>
                  <div>
                    <button onClick={() => {
                      if (window.confirm('Delete this card?')) {
                        cardDelete({ cardId: card.id, columnId: column.id })
                      }
                    }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setCreatorMode(true)}>Add new card</button>
          </div>
        ))}
      </div>
    </div>
  )
}
