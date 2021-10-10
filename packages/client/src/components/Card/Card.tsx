import { FC, useState } from 'react'
import styled from '@emotion/styled'

import { EditableCardContent } from './EditableCardContent'
import { StaticCardContent } from './StaticCardContent'
import { DropdownMenu } from './DropdownMenu'
import { useUser } from '../../features/session'
import { deleteCard, updateCard } from '../../pages/BoardPage/model'

type CardProps = any

export const Card: FC<CardProps> = (props) => {
  const { id, content, author, solved, likes, boardId } = props
  const [isEditMode, setEditMode] = useState(false)
  const user = useUser()

  const totalLikes = likes.length
  const isLiked = likes.some((like: any) => like.authorId === user.id)

  // const [addCardLike] = useAddCardLikeMutation()
  // const [removeCardLike] = useRemoveCardLikeMutation()

  const onDeleteAction = () => {
    if (window.confirm('Delete this card?')) {
      deleteCard(id)
    }
  }

  const onEditAction = () => {
    setEditMode(true)
  }

  const onSolveAction = () => {
    updateCard({ id, solved: !solved })
  }

  const onUpdateCard = (content: string) => {
    updateCard({ id, content })
    setEditMode(false)
  }

  const onToggleLike = () => {
    if (isLiked) {
      // removeCardLike({ variables: { cardId: id } })
    } else {
      // addCardLike({ variables: { like: { boardId, cardId: id } } })
    }
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
        <StaticCardContent
          content={content}
          author={author}
          isLiked={isLiked}
          totalLikes={totalLikes}
          onToggleLike={onToggleLike}
        />
      )}
    </Container>
  )
}

export const Container = styled.div`
  box-shadow: 0px 0px 0px 0.5px rgba(0, 44, 94, 0.1), 0px 8px 16px -3px rgba(0, 44, 94, 0.15);
  background-color: #fff;
  border-radius: 8px;
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
`
