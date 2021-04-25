import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { TextareaWithAutoResize as Textarea } from '@yandex/ui/Textarea/desktop/bundle'

import { PlusIcon } from '../Icons/PlusIcon'
import { CloseIcon } from '../Icons/CloseIcon'

type EditableCardContentProps = {
  variant: 'create' | 'update'
  content: string
  onAction: (content: string) => void
  onCancel: () => void
}

export const EditableCardContent: FC<EditableCardContentProps> = (props) => {
  const { content: initialContent, onCancel, onAction, variant } = props

  const [content, setContent] = useState(initialContent)
  const controlRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const control = controlRef.current;

    if (control) {
      control.focus()
      control.setSelectionRange(control.value.length, control.value.length)
    }
  }, [])

  return (
    <Container>
      <Textarea
        controlRef={controlRef}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Type..."
      />
      <Actions>
        <Button view="action" size="s" onClick={() => onAction(content)}>
          {/* TODO: Use CheckIcon for update. */}
          <PlusIcon />
          {variant === 'create' ? 'Create' : 'Update'}
        </Button>
        <Button view="clear" size="s" onClick={() => onCancel()}>
          <CloseIcon />
          Cancel
        </Button>
      </Actions>
    </Container>
  )
}

const Container = styled.div`
  .Textarea-Control {
    padding: 0;
    border: 0;
    font-family: var(--text-body-long-size-m-font-family);
    font-size: var(--text-body-long-size-m-font-size);
    line-height: var(--text-body-long-size-m-line-height);
    letter-spacing: var(--text-body-long-size-m-letter-spacing);
  }
`

const Actions = styled.div`
  .Button2 + .Button2 {
    margin-left: 8px;
  }
`
