import { Field, ID, InputType } from '@nestjs/graphql'

import { CardEntity } from './card.entity'

@InputType()
export class CreateCardInput implements Partial<CardEntity> {
  @Field()
  content: string

  @Field(() => ID)
  listId: string

  @Field(() => ID)
  boardId: string
}

@InputType()
export class UpdateCardInput implements Partial<CardEntity> {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  content?: string

  @Field({ nullable: true })
  solved?: boolean
}
