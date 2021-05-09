import { FC, useState } from 'react'
import { useGate, useList } from 'effector-react'
import { Link } from 'react-router-dom'
import { Text } from '@yandex/ui/Text/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'

import { paths } from '../paths'
import { $boards, boardCreate, BoardsGate } from './model'

export const BoardsPage: FC = () => {
  useGate(BoardsGate)

  const [value, setValue] = useState('')

  const onClick = () => {
    if (value) {
      boardCreate(value)
      setValue('')
    }
  }

  return (
    <div>
      <Text typography="headline-m">All boards</Text>
      <div>
        {useList($boards, (board) => (
          <div>
            <Link to={paths.board(board.id)}>{board.name}</Link>
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
}
