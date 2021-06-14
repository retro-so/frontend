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
    default:
      throw new Error('Unhandled subscription type: ' + event?.__typename)
  }
}

function onCardCreated(client: Client, card: any) {
  client.cache.modify({
    id: `List:${card.listId}`,
    fields: {
      cards: (cardsRefs: any) => {
        const cardRef = client.cache.writeFragment({
          fragment: CardCommonFieldsFragmentDoc,
          data: card,
        })

        return [...cardsRefs, cardRef]
      },
    },
  })
}

function onCardRemoved(client: any, card: any) {
  client.cache.modify({
    id: `List:${card.listId}`,
    fields: {
      cards: (cardsRefs: any, { readField }: any) => {
        return cardsRefs.filter((ref: any) => readField('id', ref) !== card.id)
      },
    },
  })
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
  client.cache.modify({
    id: `Board:${list.boardId}`,
    fields: {
      lists: (listsRef: any) => {
        const listRef = client.cache.writeFragment({
          fragment: ListCommonFieldsFragmentDoc,
          data: list,
        })

        return [...listsRef, listRef]
      },
    },
  })
}

function onListUpdated(client: any, list: any) {}
