import { Field, InputType, ID } from '@nestjs/graphql'

@InputType()
export class CreateListInput {
  @Field()
  name: string

  @Field(() => ID)
  board: string
}
