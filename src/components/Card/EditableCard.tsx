import { FC } from 'react'

import { Container } from './Card'
import { EditableCardContent } from './EditableCardContent'

interface EditableCardProps {
  onAction: (content: string) => void
  onCancel: () => void
}

export const EditableCard: FC<EditableCardProps> = (props) => {
  const { onAction, onCancel } = props

  return (
    <Container>
      <EditableCardContent variant="create" content="" onAction={onAction} onCancel={onCancel} />
    </Container>
  )
}
