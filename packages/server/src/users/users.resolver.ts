import { UseGuards } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'

// NOTE: Use direct import instead public API cuz cycle deps.
import { GqlAuthGuard } from 'src/auth/gql.guard'
import { GqlUser } from 'src/auth/user.decorator'

import { UserEntity } from './user.entity'

@UseGuards(GqlAuthGuard)
@Resolver(() => UserEntity)
export class UsersResolver {
  @Query(() => UserEntity)
  me(@GqlUser() user: UserEntity) {
    return user
  }
}
