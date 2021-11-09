import { normalize } from 'normalizr'

import { request } from '../libs/request'
import { board } from './schema'
import type { Board, NormalizedResponse } from './types'

export async function fetchBoards() {
  const response = await request<Board>({ path: 'boards', method: 'GET' })

  return response
}

export async function createBoard(board: any) {
  const response = await request<Board>({ path: 'boards', method: 'POST', body: board })

  return response
}

export async function fetchBoard(boardId: string) {
  const response = await request<Board>({ path: `boards/${boardId}`, method: 'GET' })
  const data = normalize<unknown, NormalizedResponse, string>(response, board)

  return {
    board: data.entities.board[data.result],
    cards: data.entities.cards,
    lists: data.entities.lists,
  }
}

export async function fetchBoardUsers(boardId: string) {
  const response = await request({ path: `boards/${boardId}/users`, method: 'GET' })

  return response
}

export async function createCard(card: any) {
  const response = await request({ path: 'cards', method: 'POST', body: card })

  return response
}

export async function deleteCard(cardId: string) {
  const response = await request({ path: `cards/${cardId}`, method: 'DELETE' })

  return response
}

export async function updateCard(card: any) {
  const response = await request({ path: `cards/${card.id}`, method: 'PATCH', body: card })

  return response
}

export async function createList(list: any) {
  const response = await request({ path: 'lists', method: 'POST', body: list })

  return response
}

export async function updateList(list: any) {
  const response = await request({ path: `lists/${list.id}`, method: 'PATCH', body: list })

  return response
}

export async function deleteList(listId: string) {
  const response = await request({ path: `lists/${listId}`, method: 'DELETE' })

  return response
}

export async function fetchMe() {
  try {
    const response = await request<any>({ path: 'auth/me', method: 'GET' })

    return response
  } catch (error: any) {
    if (error.status !== 401) {
      throw error
    }

    return Promise.resolve(null)
  }
}
