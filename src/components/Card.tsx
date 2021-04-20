import { FC } from 'react'

import type { Card as TCard } from '../api/types'

type CardProps = TCard & {
  // FIXME: Use this value from context?
  columnId: string
  cardDelete: (params: any) => void
}

export const Card: FC<CardProps> = (props) => {
  const { id, content, author, columnId, cardDelete } = props

  return (
    <div>
      {content}
      <div>Author, {author.uid}</div>
      <div>
        <button
          onClick={() => {
            if (window.confirm('Delete this card?')) {
              cardDelete({ cardId: id, columnId })
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
