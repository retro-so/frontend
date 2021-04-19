import { database } from '../libs/firebase'
import type { Board } from './types'

export function loadBoard(id: string, updateFn: (board: Board) => void) {
  database.ref(`boards/${id}`).on('value', (snapshot) => {
    updateFn(snapshot.val())
  })
}
