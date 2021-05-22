import { FC, useState } from 'react'
import { useParams } from 'react-router'
import styled from '@emotion/styled'

import { Column } from '../../components/Column'
import { useCreateListMutation, useFetchBoardQuery } from '../../api/graphql'
import { BoardRouteParams } from '../paths'

export const BoardPage: FC = () => {
  const params = useParams<BoardRouteParams>()
  const { data, loading } = useFetchBoardQuery({ variables: { id: params.id }, pollInterval: 5000 })
  const [createList] = useCreateListMutation()
  const [columnName, setColumnName] = useState('')

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div>{data?.board.name}</div>
      <hr />
      <div>Users: ...</div>
      <hr />
      <div>
        <button
          onClick={() => {
            createList({ variables: { list: { name: columnName, board: params.id } } })
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
            <Column {...list} key={list.id} />
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
