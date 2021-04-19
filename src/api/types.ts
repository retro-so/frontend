type Author = { uid: UserId }
type UserId = string
export type Card = { id: string; content: string; author: Author }
type Column = { id: string; color: string; name: string; cards: Card[] }
type Settings = { shownContent: boolean; shownLogins: boolean }

export type Board = {
  id: string
  boardName: string
  columns: Column[]
  settings: Settings
  author: Author
}
