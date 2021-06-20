import { FC } from 'react'
import { useParams } from 'react-router'
import { Text } from '@yandex/ui/Text/bundle'
import styled from '@emotion/styled'

import { Header } from '../../components/Header'
import { List } from '../../components/List'
import { useCreateListMutation } from '../../api/graphql'
import { useAuthGuard } from '../../features/session'
import { BoardRouteParams } from '../paths'
import { useBoardPageModel } from './model'
import { ActiveUsers } from './components/ActiveUsers'

export const BoardPage: FC = () => {
  useAuthGuard()

  const { link } = useParams<BoardRouteParams>()
  const { data, loading, activeUsers } = useBoardPageModel(link)
  const [createList] = useCreateListMutation()

  // TODO: Print skeleton.
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Header />
      <Toolbar>
        <Text typography="subheader-xl">{data?.board.owner.displayName}/{data?.board.name}</Text>
        <ActiveUsers users={activeUsers} />
      </Toolbar>
      <Canvas>
        <Columns>
          {data?.board.lists.map((list) => (
            // @ts-expect-error
            <List {...list} boardId={data!.board.id} key={list.id} />
          ))}
          <button
            onClick={() => {
              createList({ variables: { list: { name: '<List name>', boardId: data!.board.id } } })
            }}
          >
            Create column
          </button>
        </Columns>
      </Canvas>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Toolbar = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 16px;
  align-items: center;
  height: 40px;;
`

const Canvas = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  margin-top: 32px;
`

const Columns = styled.div`
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
`
