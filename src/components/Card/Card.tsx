import { FC, useState } from 'react'
import styled from '@emotion/styled'

import type { Card as TCard } from '../../api/types'
import { EditableCardContent } from './EditableCardContent'
import { StaticCardContent } from './StaticCardContent'
import { DropdownMenu } from './DropdownMenu'

type CardProps = TCard & {
  // FIXME: Use this value from context?
  columnId: string
  cardDelete: (params: any) => void
  cardUpdate: (params: any) => void
}

export const Card: FC<CardProps> = (props) => {
  const { id, content, author, solved, columnId, cardDelete, cardUpdate } = props
  const [isEditMode, setEditMode] = useState(false)

  const onDeleteAction = () => {
    if (window.confirm('Delete this card?')) {
      cardDelete({ columnId, cardId: id })
    }
  }

  const onEditAction = () => {
    setEditMode(true)
  }

  const onSolveAction = () => {
    cardUpdate({ columnId, cardId: id, solved: !solved })
  }

  const onUpdateCard = (content: string) => {
    cardUpdate({ columnId, cardId: id, content })
    setEditMode(false)
  }

  return (
    <Container data-solved={solved}>
      <DropdownMenu
        solved={solved}
        onSolveAction={onSolveAction}
        onEditAction={onEditAction}
        onDeleteAction={onDeleteAction}
      />
      {isEditMode ? (
        <EditableCardContent
          variant="update"
          content={content}
          onAction={(content) => onUpdateCard(content)}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <StaticCardContent content={content} author={author} />
      )}
    </Container>
  )
}

export const Container = styled.div`
  box-shadow: 0px 0px 0px 0.5px rgba(0, 44, 94, 0.1), 0px 8px 16px -3px rgba(0, 44, 94, 0.15);
  background-color: #fff;
  border-radius: 6px;
  padding: 16px;
  padding-right: 24px;
  margin-bottom: 16px;
  position: relative;

  &[data-solved='true'] {
    opacity: 0.5;
    transition: 100ms ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .Content {
    margin-bottom: 8px;
    white-space: pre;
  }
`
