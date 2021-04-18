import { database } from '../libs/firebase'

type Column = { color: string; name: string }
type Settings = { shownContent: boolean; shownLogins: boolean }

export type Board = {
  boardName: string
  columns: Column[]
  settings: Settings
}

export function loadBoard(id: string, updateFn: (board: Board) => void) {
  database.ref(`boards/${id}`).on('value', (snapshot) => {
    updateFn(snapshot.val())
  })
}
