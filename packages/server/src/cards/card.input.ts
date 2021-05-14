import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCardInput {
  @Field()
  content: string

  @Field(() => ID)
  list: string
}
