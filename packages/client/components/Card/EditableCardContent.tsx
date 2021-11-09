import { FC, useEffect, useRef, useState } from 'react'
import { TextareaWithAutoResize as Textarea } from '@yandex/ui/Textarea/desktop/bundle'
import { component, css } from '@steely/react'

import { Button } from '../../shared/components/button'

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
    const control = controlRef.current

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
        <Button size="s" kind="default" shape="text" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button size="s" kind="action" shape="fill" onClick={() => onAction(content)}>
          {variant === 'create' ? 'Create' : 'Update'}
        </Button>
      </Actions>
    </Container>
  )
}

const Container = component('div', {
  styles: css`
    .Textarea-Control {
      padding: 0;
      border: 0;
      font-family: var(--text-body-long-size-m-font-family);
      font-size: var(--text-body-long-size-m-font-size);
      line-height: var(--text-body-long-size-m-line-height);
      letter-spacing: var(--text-body-long-size-m-letter-spacing);
    }
  `,
})

const Actions = component('div', {
  styles: css`
    display: flex;
    justify-content: flex-end;

    > :not(:last-child) {
      margin-right: 8px;
    }
  `,
})
