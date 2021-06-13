import { Field, ID, InputType } from '@nestjs/graphql'

import { LikeEntity } from './LikeEntity'

@InputType()
export class AddCardLikeInput implements Partial<LikeEntity> {
  @Field(() => ID)
  cardId: string

  @Field(() => ID)
  boardId: string
}
