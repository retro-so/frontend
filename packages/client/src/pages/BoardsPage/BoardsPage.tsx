import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@yandex/ui/Text/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'

import {
  FetchBoardsQuery,
  FetchBoardsDocument,
  useFetchBoardsQuery,
  useCreateBoardMutation,
} from '../../api/graphql'
import { useAuthGuard } from '../../features/session'
import { paths } from '../paths'

export const BoardsPage: FC = () => {
  useAuthGuard()
  const { data, loading } = useFetchBoardsQuery()

  const [createBoard] = useCreateBoardMutation({
    update: (cache, result) => {
      const data = cache.readQuery<FetchBoardsQuery>({ query: FetchBoardsDocument })

      if (data?.boards && result.data) {
        const nextBoards = data.boards.concat(result.data?.createBoard)

        cache.writeQuery<FetchBoardsQuery>({
          query: FetchBoardsDocument,
          data: { boards: nextBoards },
        })
      }
    },
  })

  const [value, setValue] = useState('')

  if (loading) {
    return <>Loading...</>
  }

  const onClick = () => {
    if (value) {
      createBoard({ variables: { board: { name: value } } })
      setValue('')
    }
  }

  return (
    <div>
      <Text typography="headline-m">All boards</Text>
      <div>
        {data?.boards.map((board) => (
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
}
