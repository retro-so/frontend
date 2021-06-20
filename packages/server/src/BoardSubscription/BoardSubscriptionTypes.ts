import { Field, ObjectType, createUnionType } from '@nestjs/graphql'

import { CardEntity } from 'src/cards'
import { LikeEntity } from 'src/cards/LikeEntity'
import { ListEntity } from 'src/lists'

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

@ObjectType()
export class ListCreated {
  @Field(() => ListEntity)
  payload: ListEntity
}

@ObjectType()
export class ListUpdated {
  @Field(() => ListEntity)
  payload: ListEntity
}

@ObjectType()
export class ListRemoved {
  @Field(() => ListEntity)
  payload: ListEntity
}

export const BoardUpdated = createUnionType({
  name: 'BoardUpdated',
  types: () => [
    CardCreated,
    CardUpdated,
    CardRemoved,
    CardLikeAdded,
    CardLikeRemoved,
    ListCreated,
    ListUpdated,
    ListRemoved,
  ],
  resolveType: (type) => type.action,
})
