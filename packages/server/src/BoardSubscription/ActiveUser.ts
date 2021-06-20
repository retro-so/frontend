import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ActiveUser {
  @Field(() => ID)
  id: string

  @Field()
  displayName: string

  @Field()
  avatarUrl: string
}
