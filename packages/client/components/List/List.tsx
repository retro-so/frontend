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
import { component, css } from '@steely/react'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { useStoreMap } from 'effector-react'

import { EditableCard } from '../Card'
import { Button } from '../../shared/components/button'
import { Plus, MoreHorizontal, Trash, Edit, Color } from '../../shared/icons'
import { $cards, createCard, updateList, deleteList } from '../../pages/board/model'
import { palette, radius } from '../../shared/design-system'
import { Dropdown, Menu, ItemsGroup, Item } from '../../shared/components'
import { Card } from '../../entities/card'

interface ListProps {
  id: string
  name: string
  boardId: string
  color: 'green' | 'yellow' | 'blue' | 'red' | 'gray' | 'mint'
}

// TODO: Использовать css snap API.
export const List: FC<ListProps> = (props) => {
  const { id, name, color, boardId } = props

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

  const onUpdateColor = (color: string) => {
    updateList({ id, color })
  }

  return (
    <Container data-color={color}>
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
              <Text typography="headline-xs">
                {name}
                <Counter>{cards.length}</Counter>
              </Text>
            </span>
          )}
          <Dropdown>
            <Button shape="text" kind="dynamic" size="xs">
              <MoreHorizontal />
            </Button>
            <Menu>
              <ItemsGroup title="Change color">
                {['Green', 'Yellow', 'Blue', 'Red', 'Gray', 'Mint'].map((color) => (
                  <Item
                    key={color}
                    icon={<Color tint={color.toLowerCase()} />}
                    onAction={() => onUpdateColor(color.toLowerCase())}
                  >
                    {color}
                  </Item>
                ))}
              </ItemsGroup>
              <ItemsGroup>
                <Item icon={<Edit />} onAction={onDelete} keybind="⌘E">
                  Edit
                </Item>
                <Item icon={<Trash />} onAction={onDelete} color="red" keybind="⌘D">
                  Delete
                </Item>
              </ItemsGroup>
            </Menu>
          </Dropdown>
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
          <Footer>
            <Button
              wide
              onClick={() => setCreatorMode(true)}
              size="l"
              shape="ghost"
              kind="dynamic"
              addonBefore={<Plus />}
            >
              Add card
            </Button>
          </Footer>
        )}
      </Inner>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 100%;
  flex: 0 0 380px;

  &[data-color='green'] {
    --list-fill: ${palette.green[50]};
    --list-fill-strong: ${palette.green[100]};
    --list-text: ${palette.green[1600]};
    --button-kind-dynamic-text: ${palette.green[1600]};
    --button-kind-dynamic-fill-hovered: ${palette.green[100]};
    --button-kind-dynamic-fill-pressed: ${palette.green[200]};
  }

  &[data-color='yellow'] {
    --list-fill: ${palette.yellow[50]};
    --list-fill-strong: ${palette.yellow[100]};
    --list-text: ${palette.yellow[1600]};
    --button-kind-dynamic-text: ${palette.yellow[1600]};
    --button-kind-dynamic-fill-hovered: ${palette.yellow[100]};
    --button-kind-dynamic-fill-pressed: ${palette.yellow[200]};
  }

  &[data-color='blue'] {
    --list-fill: ${palette.blue[50]};
    --list-fill-strong: ${palette.blue[100]};
    --list-text: ${palette.blue[1600]};
    --button-kind-dynamic-text: ${palette.blue[1600]};
    --button-kind-dynamic-fill-hovered: ${palette.blue[100]};
    --button-kind-dynamic-fill-pressed: ${palette.blue[200]};
  }

  &[data-color='red'] {
    --list-fill: ${palette.red[50]};
    --list-fill-strong: ${palette.red[100]};
    --list-text: ${palette.red[1600]};
    --button-kind-dynamic-text: ${palette.red[1600]};
    --button-kind-dynamic-fill-hovered: ${palette.red[100]};
    --button-kind-dynamic-fill-pressed: ${palette.red[200]};
  }

  &[data-color='gray'] {
    --list-fill: ${palette.blueGrey[50]};
    --list-fill-strong: ${palette.blueGrey[100]};
    --list-text: ${palette.blueGrey[1600]};
    --button-kind-dynamic-text: ${palette.blueGrey[1600]};
    --button-kind-dynamic-fill-hovered: ${palette.blueGrey[100]};
    --button-kind-dynamic-fill-pressed: ${palette.blueGrey[200]};
  }

  &[data-color='mint'] {
    --list-fill: ${palette.mint[50]};
    --list-fill-strong: ${palette.mint[100]};
    --list-text: ${palette.mint[1600]};
    --button-kind-dynamic-text: ${palette.mint[1600]};
    --button-kind-dynamic-fill-hovered: ${palette.mint[100]};
    --button-kind-dynamic-fill-pressed: ${palette.mint[200]};
  }
`

const Inner = styled.div`
  border-radius: 16px;
  padding: 0 4px;
  box-sizing: border-box;
  flex: 0 0 380px;
  background-color: var(--list-fill);
  max-height: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 12px;

  .Text {
    color: var(--list-text);
    cursor: pointer;
  }

  .Header-Input .Textinput-Box {
    background-color: var(--list-fill-strong);
    border-radius: ${radius['200']};
  }

  .Header-Input .Textinput-Control {
    padding: 0 16px;
    font-family: var(--text-headline-size-xs-font-family);
    font-size: var(--text-headline-size-xs-font-size);
    line-height: var(--text-headline-size-xs-line-height);
    letter-spacing: var(--text-headline-size-xs-letter-spacing);
  }
`

const Footer = styled.div`
  padding: 16px 12px;
`

const Counter = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  margin-left: 8px;
  border-radius: ${radius['200']};
  background-color: var(--list-fill-strong);
  font-size: 90%;
`

const Cards = styled.div`
  padding: 4px 12px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > :last-child {
    margin-bottom: 32px;
  }
`
