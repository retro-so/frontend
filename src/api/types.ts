type Author = { uid: UserId }
type UserId = string
type Settings = { shownContent: boolean; shownLogins: boolean }

export type Card = {
  id: string
  content: string
  author: Author
}

export type Column = {
  id: string
  color: string
  name: string
  cards?: Card[]
}

export type Board = {
  id: string
  boardName: string
  columns: Column[]
  settings: Settings
  author: Author
}
