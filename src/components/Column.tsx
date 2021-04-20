import { FC, useState } from 'react'

import type { Column as TColumn } from '../api/types'
import { Card } from './Card'

type ColumnProps = TColumn & {
  // FIXME: Fix types for events.
  cardCreate: (params: any) => void
  cardDelete: (params: any) => void
}

export const Column: FC<ColumnProps> = (props) => {
  const { id, name, cards, cardCreate, cardDelete } = props

  const [isCreatorMode, setCreatorMode] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div style={{ backgroundColor: '#ccc', margin: '0 8px' }}>
      {name}
      <div>
        {isCreatorMode && (
          <div>
            <textarea value={value} onChange={(event) => setValue(event.target.value)} />
            <button
              onClick={() => {
                cardCreate({ content: value, columnId: id })
                setCreatorMode(false)
              }}
            >
              Create
            </button>
            <button onClick={() => setCreatorMode(false)}>Cancel</button>
          </div>
        )}
      </div>
      <div>
        {cards &&
          Object.entries(cards).map(([_, card]) => (
            <Card key={card.id} columnId={id} {...card} cardDelete={cardDelete} />
          ))}
      </div>
      <button onClick={() => setCreatorMode(true)}>Add new card</button>
    </div>
  )
}
