import { createStore, createEvent, createEffect, forward, restore } from 'effector'
import { createGate } from 'effector-react'

import { getSocketConnection } from '../../libs/socket'
import { api } from '../../api'
import type { Card, NormalizedResponse } from '../../api'

const socket = getSocketConnection()

export const BoardPageGate = createGate<string>()

// events start
export const createCard = createEvent<any>()
const cardCreated = createEvent<any>()

export const deleteCard = createEvent<Card['id']>()
const cardDeleted = createEvent<Card>()

export const updateCard = createEvent<any>()
const cardUpdated = createEvent<any>()

const userJoined = createEvent<any>()
const userLeaved = createEvent<any>()

export const createList = createEvent<any>()
const listCreated = createEvent<any>()

export const updateList = createEvent<any>()
const listUpdated = createEvent<any>()

export const deleteList = createEvent<any>()
const listDeleted = createEvent<any>()
// events end

// effects start
const fetchBoardFx = createEffect(api.fetchBoard)
const fetchBoardUsersFx = createEffect(api.fetchBoardUsers)

const createCardFx = createEffect(api.createCard)
const cardDeleteFx = createEffect(api.deleteCard)
const cardUpdateFx = createEffect(api.updateCard)

const createListFx = createEffect(api.createList)
const updateListFx = createEffect(api.updateList)
const deleteListFx = createEffect(api.deleteList)
// effects end

// stores start
export const $board = createStore<any>({})
export const $users = createStore<any>([])
export const $lists = createStore<NormalizedResponse['lists']>({})
export const $cards = createStore<NormalizedResponse['cards']>({})
export const $activeUsers = createStore<any>([])

export const $isLoading = restore(fetchBoardFx.pending.updates, true)
// stores end

// TODO: rewrite to doneData
$board.on(fetchBoardFx.done, (_, { result }) => result.board).reset(BoardPageGate.open)

$users.on(fetchBoardUsersFx.doneData, (_, users) => users)
$users.watch(console.log)

$lists
  .on(fetchBoardFx.done, (_, { result }) => result.lists)
  .on([listCreated, listUpdated], (state, list) => ({ ...state, [list.id]: list }))
  .on(listDeleted, (state, list) => {
    const { [list.id]: _, ...nextState } = state
    return nextState
  })
  .reset(BoardPageGate.open)

$cards
  .on(fetchBoardFx.done, (_, { result }) => result.cards)
  .on([cardCreated, cardUpdated], (state, card) => ({ ...state, [card.id]: card }))
  .on(cardDeleted, (state, card) => {
    const { [card.id]: _, ...nextState } = state
    return nextState
  })
  .reset(BoardPageGate.open)

$activeUsers
  .on(userJoined, (state, user) => [...state, user])
  .on(userLeaved, (state) => state)
  .reset(BoardPageGate.open)

socket
  .on('board:joined', userJoined)
  .on('board:leaved', (user) => {
    console.log('>>> leaved user', user)
  })
  .on('card:created', cardCreated)
  .on('card:updated', cardUpdated)
  .on('card:deleted', cardDeleted)
  .on('list:created', listCreated)
  .on('list:updated', listUpdated)
  .on('list:deleted', listDeleted)

// TODO: Надо придумать как можно сделать emit при BoardPageGate.open.
fetchBoardFx.done.watch(({ result }) => {
  socket.emit('board:join', result.board.id)
})

BoardPageGate.close.watch(() => {
  socket.emit('board:leave')
})

forward({ from: BoardPageGate.open, to: [fetchBoardFx, fetchBoardUsersFx] })

forward({ from: createCard, to: createCardFx })
forward({ from: updateCard, to: cardUpdateFx })
forward({ from: deleteCard, to: cardDeleteFx })

forward({ from: createList, to: createListFx })
forward({ from: updateList, to: updateListFx })
forward({ from: deleteList, to: deleteListFx })
