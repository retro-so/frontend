import { OnSubscriptionDataOptions } from '@apollo/client'

import {
  BoardUpdatedSubscription,
  CardCommonFieldsFragmentDoc,
  ListCommonFieldsFragmentDoc,
  useBoardUpdatedSubscription,
  useFetchBoardQuery,
} from '../../api/graphql'

type BoardId = string

export function useBoardPageModel(boardId: BoardId) {
  const { data, loading, error } = useFetchBoardQuery({ variables: { id: boardId } })

  useBoardUpdatedSubscription({ variables: { boardId }, onSubscriptionData })

  return { data, loading, error }
}

type Params = OnSubscriptionDataOptions<BoardUpdatedSubscription>
type Client = Params['client']

function onSubscriptionData(options: Params) {
  const { client, subscriptionData } = options

  if (subscriptionData.error) {
    throw subscriptionData.error
  }

  const event = subscriptionData.data?.boardUpdated

  switch (event?.__typename) {
    case 'CardCreated':
      return onCardCreated(client, event.payload)
    case 'CardRemoved':
      return onCardRemoved(client, event.payload)
    case 'CardUpdated':
      return onCardUpdated(client, event.payload)
    case 'CardLikeAdded':
      return onCardLikeAdded(client, event.payload)
    case 'CardLikeRemoved':
      return onCardLikeRemoved(client, event.payload)
    case 'ListCreated':
      return onListCreated(client, event.payload)
    case 'ListUpdated':
      return onListUpdated(client, event.payload)
    case 'ListRemoved':
      return onListRemoved(client, event.payload)
    default:
      throw new Error('Unhandled subscription type: ' + event?.__typename)
  }
}

function onCardCreated(client: Client, card: any) {
  const cardRef = client.cache.writeFragment({
    fragment: CardCommonFieldsFragmentDoc,
    data: card,
  })

  client.cache.modify({
    id: `List:${card.listId}`,
    fields: {
      cards: (cardsRefs: any) => {
        return [...cardsRefs, cardRef]
      },
    },
  })
}

function onCardRemoved(client: Client, card: any) {
  client.cache.evict({ id: client.cache.identify(card) })
  client.cache.gc()
}

function onCardUpdated(client: any, card: any) {}

function onCardLikeAdded(client: any, like: any) {
  client.cache.modify({
    id: `Card:${like.cardId}`,
    fields: {
      likes: (likes: any) => {
        return [...likes, { authorId: like.authorId }]
      },
    },
  })
}

function onCardLikeRemoved(client: any, like: any) {
  client.cache.modify({
    id: `Card:${like.cardId}`,
    fields: {
      likes: (likes: any) => {
        return likes.filter((l: any) => l.authorId !== like.authorId)
      },
    },
  })
}

function onListCreated(client: any, list: any) {
  const listRef = client.cache.writeFragment({
    fragment: ListCommonFieldsFragmentDoc,
    data: list,
  })

  client.cache.modify({
    id: `Board:${list.boardId}`,
    fields: {
      lists: (listsRef: any) => {
        return [...listsRef, listRef]
      },
    },
  })
}

function onListUpdated(client: any, list: any) {}

function onListRemoved(client: Client, list: any) {
  client.cache.evict({ id: client.cache.identify(list) })
  client.cache.gc()
}
