import {
  FC,
  BaseSyntheticEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'
import { Text } from '@yandex/ui/Text/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { useStoreMap } from 'effector-react'

import { DropdownMenu } from './DropdownMenu'
import { Card, EditableCard } from '../Card'
import { PlusIcon } from '../Icons/PlusIcon'
import { $cards, createCard, updateList, deleteList } from '../../pages/board/model'

type ListProps = {
  id: string
  name: string
  boardId: string
}

export const List: FC<ListProps> = (props) => {
  const { id, name, boardId } = props

  const [isEditMode, setEditMode] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isCreatorMode, setCreatorMode] = useState(false)

  const cards = useStoreMap({
    store: $cards,
    keys: [id],
    fn: (cards, [listId]) => Object.values(cards).filter((card: any) => card.listId === listId),
  })

  useEffect(() => {
    if (isCreatorMode) {
      cardsRef.current?.scrollTo(0, cardsRef.current?.scrollHeight)
    }
  }, [isCreatorMode])

  const onAction = (content: string) => {
    createCard({ listId: id, boardId, content })
    setCreatorMode(false)
  }

  const onStartEdit = () => {
    setEditMode(true)
  }

  const onStopEdit = (event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    let shouldApplyChanges = true

    if (event.type === 'keydown') {
      const keyboardEvent = event as KeyboardEvent
      shouldApplyChanges = keyboardEvent.code === 'Escape' || keyboardEvent.code === 'Enter'
    }

    if (shouldApplyChanges) {
      const baseEvent = event as BaseSyntheticEvent
      updateList({ id, name: baseEvent.target.value })
      setEditMode(false)
    }
  }

  const onDelete = () => {
    if (window.confirm('Delete this list?')) {
      deleteList(id)
    }
  }

  return (
    <Container>
      <DropdownMenu onDeleteAction={onDelete} />
      <Inner>
        <Header>
          {isEditMode ? (
            <Textinput
              className="Header-Input"
              value={name}
              autoFocus
              onBlur={onStopEdit}
              onKeyDown={onStopEdit}
            />
          ) : (
            <span onClick={onStartEdit} onFocus={onStartEdit} tabIndex={0}>
              <Text typography="headline-xs" as="h2" color="secondary">
                {name}
                <Counter>{cards.length}</Counter>
              </Text>
            </span>
          )}
        </Header>
        <Cards ref={cardsRef}>
          {cards.map((card) => (
            <Card {...card} key={card.id} />
          ))}
          {isCreatorMode && (
            <EditableCard onAction={onAction} onCancel={() => setCreatorMode(false)} />
          )}
        </Cards>
        {!isCreatorMode && (
          <Button onClick={() => setCreatorMode(true)} className="AddButton" view="clear" size="s">
            <PlusIcon />
            Add card
          </Button>
        )}
      </Inner>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 100%;
  flex: 0 0 380px;

  .SvgIcon {
    margin-right: 8px;
  }
`

const Inner = styled.div`
  border-radius: 16px;
  padding: 16px 4px;
  box-sizing: border-box;
  flex: 0 0 380px;
  background-color: #f7f8fa;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  margin-bottom: 16px;
  padding: 0 8px;

  .Text {
    margin: 0;
    padding: 0 16px;
    cursor: pointer;
  }

  .Header-Input .Textinput-Box {
    background-color: #eaecf0;
    border-radius: 8px;
  }

  .Header-Input .Textinput-Control {
    padding: 0 16px;
    font-family: var(--text-headline-size-xs-font-family);
    font-size: var(--text-headline-size-xs-font-size);
    line-height: var(--text-headline-size-xs-line-height);
    letter-spacing: var(--text-headline-size-xs-letter-spacing);
  }
`

const Counter = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  margin-left: 8px;
  border-radius: 8px;
  background-color: #eaecf0;
  font-size: 90%;
`

const Cards = styled.div`
  padding: 4px 16px;
  overflow-y: scroll;
`
