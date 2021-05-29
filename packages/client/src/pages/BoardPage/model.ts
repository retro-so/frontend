import {
  CardCommonFieldsFragmentDoc,
  useCardCreatedSubscription,
  useCardRemovedSubscription,
  useCardUpdatedSubscription,
  useFetchBoardQuery,
} from '../../api/graphql'

type BoardId = string

export function useBoardPageModel(boardId: BoardId) {
  const { data, loading, error } = useFetchBoardQuery({ variables: { id: boardId } })

  useCardCreatedSubscription({
    variables: { boardId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const card = subscriptionData.data!.cardCreated

      client.cache.modify({
        id: `List:${card.listId}`,
        fields: {
          cards: (cardsRefs) => {
            const cardRef = client.cache.writeFragment({
              fragment: CardCommonFieldsFragmentDoc,
              data: card,
            })

            return [...cardsRefs, cardRef]
          },
        },
      })
    },
  })

  useCardRemovedSubscription({
    variables: { boardId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const card = subscriptionData.data!.cardRemoved

      client.cache.modify({
        id: `List:${card.listId}`,
        fields: {
          cards: (cardsRefs, { readField }) => {
            return cardsRefs.filter((ref: any) => readField('id', ref) !== card.id)
          },
        },
      })
    },
  })

  useCardUpdatedSubscription({ variables: { boardId } })

  return { data, loading, error }
}
