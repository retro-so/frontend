// When this types placed in BoardSubscriptionTypes
// then we have error for deps resolve in CardsResolver.

import { Field, ObjectType, createUnionType } from '@nestjs/graphql'

import { ActiveUser } from './ActiveUser'

@ObjectType()
export class UserConnected {
  @Field(() => ActiveUser)
  payload: ActiveUser
}

@ObjectType()
export class UserDisconnected {
  @Field(() => ActiveUser)
  payload: ActiveUser
}

export const ConnectionUpdate = createUnionType({
  name: 'ConnectionUpdate',
  types: () => [UserConnected, UserDisconnected],
  resolveType: (type) => type.action,
})
