import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { Text } from '@yandex/ui/Text/bundle'
import styled from '@emotion/styled'

import { Header } from '../../components/Header'
import { List } from '../../components/List'
import { useCreateListMutation } from '../../api/graphql'
import { useAuthGuard } from '../../features/session'
import { BoardRouteParams } from '../paths'
import { useBoardPageModel } from './model'

export const BoardPage: FC = () => {
  useAuthGuard()

  const { id } = useParams<BoardRouteParams>()
  const { error, data, loading } = useBoardPageModel(id)
  const [createList] = useCreateListMutation()

  if (error) {
    throw new Error(error as any)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Header />
      <Text typography="headline-m">{data?.board.name}</Text>
      <hr />
      <div>Users: ...</div>
      <Canvas>
        <Columns>
          {data?.board.lists.map((list) => (
            // @ts-expect-error
            <List {...list} boardId={id} key={list.id} />
          ))}
          <button
            onClick={() => {
              createList({ variables: { list: { name: '<List name>', boardId: id } } })
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

const Canvas = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
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
