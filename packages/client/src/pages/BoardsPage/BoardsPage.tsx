import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'
import { Text } from '@yandex/ui/Text/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'

import { withAuth } from '../../features/session'
import { paths } from '../paths'
import { BoardsPageGate, createBoard, $boards, $isLoading } from './model'

export const BoardsPage: FC = withAuth(() => {
  useGate(BoardsPageGate)

  const boards = useStore($boards)
  const isLoading = useStore($isLoading)

  const [value, setValue] = useState('')

  if (isLoading) {
    return <>Loading...</>
  }

  const onClick = () => {
    if (value) {
      createBoard({ name: value })
      setValue('')
    }
  }

  return (
    <div>
      <Text typography="headline-m">All boards</Text>
      <div>
        {boards.map((board: any) => (
          <div key={board.id}>
            <Link to={paths.board(board.link)}>{board.name}</Link>
          </div>
        ))}
      </div>
      <Text typography="headline-s">Add new board</Text>
      <div>
        <Textinput
          view="default"
          size="m"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button view="default" size="m" onClick={onClick}>
          Add
        </Button>
      </div>
    </div>
  )
})
