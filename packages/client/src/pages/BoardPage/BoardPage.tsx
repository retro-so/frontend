import { FC, useState } from 'react'
import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router'
import styled from '@emotion/styled'

import { Column } from '../../components/Column'
import { BoardRouteParams } from '../paths'
import { $board, BoardGate, cardCreate, cardDelete, columnCreate, cardUpdate } from './model'

export const BoardPage: FC = () => {
  const params = useParams<BoardRouteParams>()
  useGate(BoardGate, { id: params.id })
  const board = useStore($board)

  const [columnName, setColumnName] = useState('')

  if (!board) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div>{board.boardName}</div>
      <hr />
      <div>Users: ...</div>
      <hr />
      <div>
        <button
          onClick={() => {
            columnCreate({ name: columnName })
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
          {Object.entries(board.columns).map(([_, column]) => (
            <Column
              {...column}
              key={column.id}
              cardCreate={cardCreate}
              cardDelete={cardDelete}
              cardUpdate={cardUpdate}
            />
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
