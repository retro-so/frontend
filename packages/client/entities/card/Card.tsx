import { FC, useState } from 'react'
import { useHover } from 'web-platform-alpha'
import { component, css } from '@steely/react'
import { Text } from '@yandex/ui/Text/bundle'
import { TextareaWithAutoResize as Textarea } from '@yandex/ui/Textarea/desktop/bundle'

import { useUser } from '../../features/session'
import { deleteCard, updateCard } from '../../pages/board/model'
import { Heart, MoreVertical, Edit, Fire, Trash } from '../../shared/icons'
import { Button, UserAvatar, Dropdown, Menu, Item } from '../../shared/components'

type CardProps = any

export const Card: FC<CardProps> = (props) => {
  const { id, content, author, solved, likes, boardId } = props
  const [isEditMode, setEditMode] = useState(false)
  const [ediableContent, setEditableContent] = useState(content)
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const { isHovered, hoverProps } = useHover({})
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
    <Container {...hoverProps} data-solved={solved}>
      <Header data-disabled={isEditMode}>
        <UserAvatar size="s" src={author.avatarUrl} />
        <Info>
          <DisplayName>{author.displayName}</DisplayName>
          <Date>10.10.10</Date>
        </Info>
        <Actions data-visible={isHovered || isEditMode || isDropdownVisible || undefined}>
          <Button shape="text" size="xs" kind="default">
            <Heart />
          </Button>
          <Dropdown onChangeVisible={setDropdownVisible}>
            <Button shape="text" size="xs" kind="default">
              <MoreVertical />
            </Button>
            <Menu>
              <Item onClick={onSolveAction}>
                <Fire />
                {solved ? 'Unsolve' : 'Solve'}
              </Item>
              <Item onClick={onEditAction}>
                <Edit />
                Edit
              </Item>
              <Item onClick={onDeleteAction} color="red">
                <Trash />
                Delete
              </Item>
            </Menu>
          </Dropdown>
        </Actions>
      </Header>
      {isEditMode ? (
        <>
          <EdiableCardText
            autoFocus
            value={ediableContent}
            onChange={(event) => setEditableContent(event.target.value)}
          />
          <Actions data-visible="true">
            <Button size="s" kind="default" shape="text" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button size="s" kind="action" shape="fill" onClick={() => onUpdateCard(content)}>
              Update
            </Button>
          </Actions>
        </>
      ) : (
        <CardText>{content}</CardText>
      )}
    </Container>
  )
}

export const Container = component('div', {
  styles: css`
    box-shadow: 0px 1px 2px rgba(0, 44, 94, 0.12), 0px 0px 2px rgba(0, 44, 94, 0.15),
      0px 19px 38px -19px rgba(0, 44, 94, 0.2);
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    /* margin-bottom: 16px; */
    position: relative;
    font-family: Helvetica, sans-serif;

    &[data-solved='true'] {
      opacity: 0.5;
      transition: 100ms ease-in-out;

      &:hover {
        opacity: 1;
      }
    }
  `,
})

const Header = component('div', {
  styles: css`
    display: flex;
    margin-bottom: 8px;

    &[data-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  `,
})

const Info = component('div', {
  styles: css`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    font-size: 13px;
    line-height: 1;
  `,
})

const DisplayName = component('span', {
  styles: css`
    color: #00967a;
    margin-bottom: 4px;
  `,
})

const Date = component('span', {
  styles: css`
    color: #9598ad;
  `,
})

const Actions = component('div', {
  styles: css`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    visibility: hidden;
    opacity: 0;
    transition: 100ms ease-in-out;

    &[data-visible='true'] {
      visibility: visible;
      opacity: 1;
    }

    & > :not(:last-child) {
      margin-right: 8px;
    }
  `,
})

const CardText = component(Text, {
  defaultProps: {
    typography: 'body-long-m',
  },
  styles: css`
    white-space: pre;
  `,
})

const EdiableCardText = component(Textarea, {
  defaultProps: {
    placeholder: 'Type...',
  },
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
