import { FC } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@yandex/ui/Text/bundle'
import { useGate, useStore, useStoreMap } from 'effector-react'
import { component, css } from '@steely/react'

import { Header } from '../../components/Header'
import { List } from '../../components/List'
import { withAuth } from '../../features/session'
import { ActiveUsers } from './components/ActiveUsers'
import { BoardPageGate, createList, $board, $activeUsers, $isLoading, $lists } from './model'

const BoardPage: FC = withAuth(() => {
  const router = useRouter()
  const link = router.query.link as string

  useGate(BoardPageGate, link)

  const board = useStore($board)
  const activeUsers = useStore($activeUsers)
  const isLoading = useStore($isLoading)

  const lists = useStoreMap({
    store: $lists,
    keys: [link],
    fn: (lists) => Object.values(lists),
  })

  // TODO: Print skeleton.
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Header />
      <Toolbar>
        <Text typography="headline-m" weight="bold">
          {board.owner.displayName}/{board.name}
        </Text>
        <ActiveUsers users={activeUsers} />
      </Toolbar>
      <Canvas>
        <Columns>
          {lists.map((list) => (
            <List id={list.id} name={list.name} boardId={list.boardId} key={list.id} />
          ))}
          <button onClick={() => createList({ name: '<List name>', boardId: board.id })}>
            Create column
          </button>
        </Columns>
      </Canvas>
    </Container>
  )
})

export default BoardPage

const Container = component('div', {
  styles: css`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `,
})

const Toolbar = component('div', {
  styles: css`
    display: flex;
    gap: 16px;
    padding: 24px;
    align-items: center;
    height: 40px;
  `,
})

const Canvas = component('div', {
  styles: css`
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
  `,
})

const Columns = component('div', {
  styles: css`
    display: flex;
    align-items: flex-start;
    padding: 0 16px;
    overflow-x: scroll;
    height: 100%;

    &::after {
      content: '';
      width: 16px;
      height: 1px;
      display: table;
    }

    > * {
      margin-right: 16px;
    }

    > :last-of-type {
      margin-right: 0;
    }
  `,
})
