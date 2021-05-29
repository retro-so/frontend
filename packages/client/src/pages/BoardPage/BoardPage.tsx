import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { Text } from '@yandex/ui/Text/bundle'
import styled from '@emotion/styled'

import { Header } from '../../components/Header'
import { Column } from '../../components/Column'
import { useCreateListMutation } from '../../api/graphql'
import { useAuthGuard } from '../../features/session'
import { BoardRouteParams } from '../paths'
import { useBoardPageModel } from './model'

export const BoardPage: FC = () => {
  useAuthGuard()

  const { id } = useParams<BoardRouteParams>()
  const { error, data, loading } = useBoardPageModel(id)
  const [createList] = useCreateListMutation()
  const [columnName, setColumnName] = useState('')

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
      <hr />
      <div>
        <button
          onClick={() => {
            createList({ variables: { list: { name: columnName, boardId: id } } })
            setColumnName('')
          }}
        >
          Create column
        </button>
        <input onChange={(event) => setColumnName(event.target.value)} value={columnName} />
      </div>
      <hr />
      <Canvas>
        <Columns>
          {data?.board.lists.map((list) => (
            // @ts-expect-error
            <Column {...list} boardId={id} key={list.id} />
          ))}
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
