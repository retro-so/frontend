import { Field, InputType, ID } from '@nestjs/graphql'

import { ListEntity } from './list.entity'

@InputType()
export class CreateListInput implements Partial<ListEntity> {
  @Field()
  name: string

  @Field(() => ID)
  boardId: string
}

@InputType()
export class UpdateListInput implements Partial<ListEntity> {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}
