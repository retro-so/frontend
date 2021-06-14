import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCardLikeInput = {
  cardId: Scalars['ID'];
  boardId: Scalars['ID'];
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['ID'];
  owner: User;
  name: Scalars['String'];
  lists: Array<List>;
  createdAt: Scalars['String'];
};

export type BoardUpdated = CardCreated | CardUpdated | CardRemoved | CardLikeAdded | CardLikeRemoved | ListCreated | ListUpdated;

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  index: Scalars['Float'];
  listId: Scalars['String'];
  boardId: Scalars['ID'];
  content: Scalars['String'];
  author: User;
  solved: Scalars['Boolean'];
  likes: Array<Like>;
};

export type CardCreated = {
  __typename?: 'CardCreated';
  payload: Card;
};

export type CardLikeAdded = {
  __typename?: 'CardLikeAdded';
  payload: Like;
};

export type CardLikeRemoved = {
  __typename?: 'CardLikeRemoved';
  payload: Like;
};

export type CardRemoved = {
  __typename?: 'CardRemoved';
  payload: Card;
};

export type CardUpdated = {
  __typename?: 'CardUpdated';
  payload: Card;
};

export type CreateBoardInput = {
  name: Scalars['String'];
};

export type CreateCardInput = {
  content: Scalars['String'];
  listId: Scalars['ID'];
  boardId: Scalars['ID'];
};

export type CreateListInput = {
  name: Scalars['String'];
  boardId: Scalars['ID'];
};

export type Like = {
  __typename?: 'Like';
  authorId: Scalars['ID'];
  cardId: Scalars['ID'];
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID'];
  index: Scalars['Int'];
  boardId: Scalars['ID'];
  name: Scalars['String'];
  cards: Array<Card>;
};

export type ListCreated = {
  __typename?: 'ListCreated';
  payload: List;
};

export type ListUpdated = {
  __typename?: 'ListUpdated';
  payload: List;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createList: List;
  updateList: List;
  createCard: Card;
  updateCard: Card;
  removeCard: Card;
  addCardLike: Scalars['Boolean'];
  removeCardLike: Scalars['Boolean'];
};


export type MutationCreateBoardArgs = {
  board: CreateBoardInput;
};


export type MutationCreateListArgs = {
  list: CreateListInput;
};


export type MutationUpdateListArgs = {
  list: UpdateListInput;
};


export type MutationCreateCardArgs = {
  card: CreateCardInput;
};


export type MutationUpdateCardArgs = {
  card: UpdateCardInput;
};


export type MutationRemoveCardArgs = {
  id: Scalars['ID'];
};


export type MutationAddCardLikeArgs = {
  like: AddCardLikeInput;
};


export type MutationRemoveCardLikeArgs = {
  cardId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  boards: Array<Board>;
  board: Board;
};


export type QueryBoardArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  boardUpdated: BoardUpdated;
};


export type SubscriptionBoardUpdatedArgs = {
  boardId: Scalars['ID'];
};

export type UpdateCardInput = {
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  solved?: Maybe<Scalars['Boolean']>;
};

export type UpdateListInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  provider: Scalars['String'];
  login: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  avatarUrl: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatarUrl' | 'displayName'>
  ) }
);

export type CardCommonFieldsFragment = (
  { __typename?: 'Card' }
  & Pick<Card, 'id' | 'content' | 'solved' | 'listId' | 'boardId'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'displayName'>
  ), likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'authorId'>
  )> }
);

export type ListCommonFieldsFragment = (
  { __typename?: 'List' }
  & Pick<List, 'id' | 'name' | 'index' | 'boardId'>
);

export type FetchBoardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchBoardQuery = (
  { __typename?: 'Query' }
  & { board: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'name'>
    & { lists: Array<(
      { __typename?: 'List' }
      & { cards: Array<(
        { __typename?: 'Card' }
        & CardCommonFieldsFragment
      )> }
      & ListCommonFieldsFragment
    )> }
  ) }
);

export type CreateListMutationVariables = Exact<{
  list: CreateListInput;
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'List' }
    & ListCommonFieldsFragment
  ) }
);

export type CreateCardMutationVariables = Exact<{
  card: CreateCardInput;
}>;


export type CreateCardMutation = (
  { __typename?: 'Mutation' }
  & { createCard: (
    { __typename?: 'Card' }
    & CardCommonFieldsFragment
  ) }
);

export type UpdateCardMutationVariables = Exact<{
  card: UpdateCardInput;
}>;


export type UpdateCardMutation = (
  { __typename?: 'Mutation' }
  & { updateCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'content'>
  ) }
);

export type RemoveCardMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveCardMutation = (
  { __typename?: 'Mutation' }
  & { removeCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'listId'>
  ) }
);

export type AddCardLikeMutationVariables = Exact<{
  like: AddCardLikeInput;
}>;


export type AddCardLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCardLike'>
);

export type RemoveCardLikeMutationVariables = Exact<{
  cardId: Scalars['ID'];
}>;


export type RemoveCardLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCardLike'>
);

export type UpdateListMutationVariables = Exact<{
  list: UpdateListInput;
}>;


export type UpdateListMutation = (
  { __typename?: 'Mutation' }
  & { updateList: (
    { __typename?: 'List' }
    & Pick<List, 'name'>
  ) }
);

export type BoardUpdatedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type BoardUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { boardUpdated: (
    { __typename?: 'CardCreated' }
    & { payload: (
      { __typename?: 'Card' }
      & CardCommonFieldsFragment
    ) }
  ) | (
    { __typename?: 'CardUpdated' }
    & { payload: (
      { __typename?: 'Card' }
      & CardCommonFieldsFragment
    ) }
  ) | (
    { __typename?: 'CardRemoved' }
    & { payload: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'listId'>
    ) }
  ) | (
    { __typename?: 'CardLikeAdded' }
    & { payload: (
      { __typename?: 'Like' }
      & Pick<Like, 'cardId' | 'authorId'>
    ) }
  ) | (
    { __typename?: 'CardLikeRemoved' }
    & { payload: (
      { __typename?: 'Like' }
      & Pick<Like, 'cardId' | 'authorId'>
    ) }
  ) | (
    { __typename?: 'ListCreated' }
    & { payload: (
      { __typename?: 'List' }
      & ListCommonFieldsFragment
    ) }
  ) | (
    { __typename?: 'ListUpdated' }
    & { payload: (
      { __typename?: 'List' }
      & ListCommonFieldsFragment
    ) }
  ) }
);

export type BoardCommonFieldsFragment = (
  { __typename?: 'Board' }
  & Pick<Board, 'id' | 'name'>
);

export type FetchBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoardsQuery = (
  { __typename?: 'Query' }
  & { boards: Array<(
    { __typename?: 'Board' }
    & BoardCommonFieldsFragment
  )> }
);

export type CreateBoardMutationVariables = Exact<{
  board: CreateBoardInput;
}>;


export type CreateBoardMutation = (
  { __typename?: 'Mutation' }
  & { createBoard: (
    { __typename?: 'Board' }
    & BoardCommonFieldsFragment
  ) }
);

export const CardCommonFieldsFragmentDoc = gql`
    fragment CardCommonFields on Card {
  id
  content
  solved
  listId
  boardId
  author {
    displayName
  }
  likes {
    authorId
  }
}
    `;
export const ListCommonFieldsFragmentDoc = gql`
    fragment ListCommonFields on List {
  id
  name
  index
  boardId
}
    `;
export const BoardCommonFieldsFragmentDoc = gql`
    fragment BoardCommonFields on Board {
  id
  name
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    id
    avatarUrl
    displayName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const FetchBoardDocument = gql`
    query FetchBoard($id: ID!) {
  board(id: $id) {
    id
    name
    lists {
      ...ListCommonFields
      cards {
        ...CardCommonFields
      }
    }
  }
}
    ${ListCommonFieldsFragmentDoc}
${CardCommonFieldsFragmentDoc}`;

/**
 * __useFetchBoardQuery__
 *
 * To run a query within a React component, call `useFetchBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchBoardQuery(baseOptions: Apollo.QueryHookOptions<FetchBoardQuery, FetchBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, options);
      }
export function useFetchBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchBoardQuery, FetchBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, options);
        }
export type FetchBoardQueryHookResult = ReturnType<typeof useFetchBoardQuery>;
export type FetchBoardLazyQueryHookResult = ReturnType<typeof useFetchBoardLazyQuery>;
export type FetchBoardQueryResult = Apollo.QueryResult<FetchBoardQuery, FetchBoardQueryVariables>;
export const CreateListDocument = gql`
    mutation CreateList($list: CreateListInput!) {
  createList(list: $list) {
    ...ListCommonFields
  }
}
    ${ListCommonFieldsFragmentDoc}`;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const CreateCardDocument = gql`
    mutation CreateCard($card: CreateCardInput!) {
  createCard(card: $card) {
    ...CardCommonFields
  }
}
    ${CardCommonFieldsFragmentDoc}`;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      card: // value for 'card'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const UpdateCardDocument = gql`
    mutation UpdateCard($card: UpdateCardInput!) {
  updateCard(card: $card) {
    content
  }
}
    `;
export type UpdateCardMutationFn = Apollo.MutationFunction<UpdateCardMutation, UpdateCardMutationVariables>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      card: // value for 'card'
 *   },
 * });
 */
export function useUpdateCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardMutation, UpdateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, options);
      }
export type UpdateCardMutationHookResult = ReturnType<typeof useUpdateCardMutation>;
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<UpdateCardMutation, UpdateCardMutationVariables>;
export const RemoveCardDocument = gql`
    mutation RemoveCard($id: ID!) {
  removeCard(id: $id) {
    id
    listId
  }
}
    `;
export type RemoveCardMutationFn = Apollo.MutationFunction<RemoveCardMutation, RemoveCardMutationVariables>;

/**
 * __useRemoveCardMutation__
 *
 * To run a mutation, you first call `useRemoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCardMutation, { data, loading, error }] = useRemoveCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCardMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCardMutation, RemoveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCardMutation, RemoveCardMutationVariables>(RemoveCardDocument, options);
      }
export type RemoveCardMutationHookResult = ReturnType<typeof useRemoveCardMutation>;
export type RemoveCardMutationResult = Apollo.MutationResult<RemoveCardMutation>;
export type RemoveCardMutationOptions = Apollo.BaseMutationOptions<RemoveCardMutation, RemoveCardMutationVariables>;
export const AddCardLikeDocument = gql`
    mutation AddCardLike($like: AddCardLikeInput!) {
  addCardLike(like: $like)
}
    `;
export type AddCardLikeMutationFn = Apollo.MutationFunction<AddCardLikeMutation, AddCardLikeMutationVariables>;

/**
 * __useAddCardLikeMutation__
 *
 * To run a mutation, you first call `useAddCardLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardLikeMutation, { data, loading, error }] = useAddCardLikeMutation({
 *   variables: {
 *      like: // value for 'like'
 *   },
 * });
 */
export function useAddCardLikeMutation(baseOptions?: Apollo.MutationHookOptions<AddCardLikeMutation, AddCardLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCardLikeMutation, AddCardLikeMutationVariables>(AddCardLikeDocument, options);
      }
export type AddCardLikeMutationHookResult = ReturnType<typeof useAddCardLikeMutation>;
export type AddCardLikeMutationResult = Apollo.MutationResult<AddCardLikeMutation>;
export type AddCardLikeMutationOptions = Apollo.BaseMutationOptions<AddCardLikeMutation, AddCardLikeMutationVariables>;
export const RemoveCardLikeDocument = gql`
    mutation RemoveCardLike($cardId: ID!) {
  removeCardLike(cardId: $cardId)
}
    `;
export type RemoveCardLikeMutationFn = Apollo.MutationFunction<RemoveCardLikeMutation, RemoveCardLikeMutationVariables>;

/**
 * __useRemoveCardLikeMutation__
 *
 * To run a mutation, you first call `useRemoveCardLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCardLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCardLikeMutation, { data, loading, error }] = useRemoveCardLikeMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useRemoveCardLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCardLikeMutation, RemoveCardLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCardLikeMutation, RemoveCardLikeMutationVariables>(RemoveCardLikeDocument, options);
      }
export type RemoveCardLikeMutationHookResult = ReturnType<typeof useRemoveCardLikeMutation>;
export type RemoveCardLikeMutationResult = Apollo.MutationResult<RemoveCardLikeMutation>;
export type RemoveCardLikeMutationOptions = Apollo.BaseMutationOptions<RemoveCardLikeMutation, RemoveCardLikeMutationVariables>;
export const UpdateListDocument = gql`
    mutation UpdateList($list: UpdateListInput!) {
  updateList(list: $list) {
    name
  }
}
    `;
export type UpdateListMutationFn = Apollo.MutationFunction<UpdateListMutation, UpdateListMutationVariables>;

/**
 * __useUpdateListMutation__
 *
 * To run a mutation, you first call `useUpdateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListMutation, { data, loading, error }] = useUpdateListMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useUpdateListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListMutation, UpdateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument, options);
      }
export type UpdateListMutationHookResult = ReturnType<typeof useUpdateListMutation>;
export type UpdateListMutationResult = Apollo.MutationResult<UpdateListMutation>;
export type UpdateListMutationOptions = Apollo.BaseMutationOptions<UpdateListMutation, UpdateListMutationVariables>;
export const BoardUpdatedDocument = gql`
    subscription BoardUpdated($boardId: ID!) {
  boardUpdated(boardId: $boardId) {
    ... on CardCreated {
      payload {
        ...CardCommonFields
      }
    }
    ... on CardUpdated {
      payload {
        ...CardCommonFields
      }
    }
    ... on CardRemoved {
      payload {
        id
        listId
      }
    }
    ... on CardLikeAdded {
      payload {
        cardId
        authorId
      }
    }
    ... on CardLikeRemoved {
      payload {
        cardId
        authorId
      }
    }
    ... on ListCreated {
      payload {
        ...ListCommonFields
      }
    }
    ... on ListUpdated {
      payload {
        ...ListCommonFields
      }
    }
  }
}
    ${CardCommonFieldsFragmentDoc}
${ListCommonFieldsFragmentDoc}`;

/**
 * __useBoardUpdatedSubscription__
 *
 * To run a query within a React component, call `useBoardUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBoardUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardUpdatedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useBoardUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<BoardUpdatedSubscription, BoardUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BoardUpdatedSubscription, BoardUpdatedSubscriptionVariables>(BoardUpdatedDocument, options);
      }
export type BoardUpdatedSubscriptionHookResult = ReturnType<typeof useBoardUpdatedSubscription>;
export type BoardUpdatedSubscriptionResult = Apollo.SubscriptionResult<BoardUpdatedSubscription>;
export const FetchBoardsDocument = gql`
    query FetchBoards {
  boards {
    ...BoardCommonFields
  }
}
    ${BoardCommonFieldsFragmentDoc}`;

/**
 * __useFetchBoardsQuery__
 *
 * To run a query within a React component, call `useFetchBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchBoardsQuery(baseOptions?: Apollo.QueryHookOptions<FetchBoardsQuery, FetchBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument, options);
      }
export function useFetchBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchBoardsQuery, FetchBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument, options);
        }
export type FetchBoardsQueryHookResult = ReturnType<typeof useFetchBoardsQuery>;
export type FetchBoardsLazyQueryHookResult = ReturnType<typeof useFetchBoardsLazyQuery>;
export type FetchBoardsQueryResult = Apollo.QueryResult<FetchBoardsQuery, FetchBoardsQueryVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($board: CreateBoardInput!) {
  createBoard(board: $board) {
    ...BoardCommonFields
  }
}
    ${BoardCommonFieldsFragmentDoc}`;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      board: // value for 'board'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;