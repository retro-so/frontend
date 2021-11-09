import { schema } from 'normalizr'

const card = new schema.Entity('cards')
const list = new schema.Entity('lists', { cards: [card] })
const board = new schema.Entity('board', { lists: [list] })

export { board }
