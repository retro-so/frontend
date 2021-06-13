import { Field, ObjectType, createUnionType } from '@nestjs/graphql'

import { CardEntity } from 'src/cards'
import { LikeEntity } from 'src/cards/LikeEntity'

@ObjectType()
export class CardCreated {
  @Field(() => CardEntity)
  payload: CardEntity
}

@ObjectType()
export class CardUpdated {
  @Field(() => CardEntity)
  payload: CardEntity
}

@ObjectType()
export class CardRemoved {
  @Field(() => CardEntity)
  payload: CardEntity
}

@ObjectType()
export class CardLikeAdded {
  @Field(() => LikeEntity)
  payload: LikeEntity
}

@ObjectType()
export class CardLikeRemoved {
  @Field(() => LikeEntity)
  payload: LikeEntity
}

export const BoardUpdated = createUnionType({
  name: 'BoardUpdated',
  types: () => [CardCreated, CardUpdated, CardRemoved, CardLikeAdded, CardLikeRemoved],
  resolveType: (value) => value.action,
})
