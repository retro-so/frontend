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

export type Board = {
  __typename?: 'Board';
  id: Scalars['ID'];
  owner: User;
  name: Scalars['String'];
  lists: Array<List>;
  createdAt: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  index: Scalars['Float'];
  content: Scalars['String'];
  author: User;
  solved: Scalars['Boolean'];
};

export type CreateBoardInput = {
  name: Scalars['String'];
};

export type CreateCardInput = {
  content: Scalars['String'];
  list: Scalars['ID'];
};

export type CreateListInput = {
  name: Scalars['String'];
  board: Scalars['ID'];
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID'];
  index: Scalars['Int'];
  name: Scalars['String'];
  cards: Array<Card>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createList: List;
  createCard: Card;
  updateCard: Card;
  removeCard: Scalars['String'];
};


export type MutationCreateBoardArgs = {
  board: CreateBoardInput;
};


export type MutationCreateListArgs = {
  list: CreateListInput;
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

export type Query = {
  __typename?: 'Query';
  me: User;
  boards: Array<Board>;
  board: Board;
};


export type QueryBoardArgs = {
  id: Scalars['ID'];
};

export type UpdateCardInput = {
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  solved?: Maybe<Scalars['Boolean']>;
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
    & Pick<User, 'avatarUrl' | 'displayName'>
  ) }
);

export type CardCommonFieldsFragment = (
  { __typename?: 'Card' }
  & Pick<Card, 'id' | 'content' | 'solved'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'displayName'>
  ) }
);

export type ListCommonFieldsFragment = (
  { __typename?: 'List' }
  & Pick<List, 'id' | 'name' | 'index'>
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
  & Pick<Mutation, 'removeCard'>
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
  author {
    displayName
  }
}
    `;
export const ListCommonFieldsFragmentDoc = gql`
    fragment ListCommonFields on List {
  id
  name
  index
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
  removeCard(id: $id)
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