import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Text } from '@yandex/ui/Text/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'

import { List as ListType, useCreateCardMutation } from '../api/graphql'
import { Card, EditableCard } from './Card'
import { PlusIcon } from './Icons/PlusIcon'

type ColumnProps = ListType & {
  boardId: string
}

export const Column: FC<ColumnProps> = (props) => {
  const { id, name, cards, boardId } = props

  const cardsRef = useRef<HTMLDivElement>(null)
  const [isCreatorMode, setCreatorMode] = useState(false)
  const [createCard] = useCreateCardMutation()

  useEffect(() => {
    if (isCreatorMode) {
      cardsRef.current?.scrollTo(0, cardsRef.current?.scrollHeight)
    }
  }, [isCreatorMode])

  const onAction = (content: string) => {
    createCard({ variables: { card: { listId: id, boardId, content } } })
    setCreatorMode(false)
  }

  return (
    <Container>
      <Inner>
        <Header>
          <Text typography="headline-xs" as="h2" color="secondary">
            {name}
          </Text>
        </Header>
        <Cards ref={cardsRef}>
          {/* FIXME: Remove optional operator. */}
          {cards.map((card: any) => (
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
  height: 100%;
  flex: 0 0 380px;

  .SvgIcon {
    margin-right: 8px;
  }
`

const Inner = styled.div`
  border-radius: 6px;
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
  padding: 0 16px;

  .Text {
    margin: 0;
  }
`

const Cards = styled.div`
  padding: 4px 16px;
  overflow-y: scroll;
`
