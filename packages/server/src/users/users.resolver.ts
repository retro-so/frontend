import { UseGuards } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'

// NOTE: Use direct import instead public API cuz cycle deps.
import { AccessAuthGuard } from 'src/auth/AccessAuthGuard'
import { GqlUser } from 'src/auth/user.decorator'

import { UserEntity } from './user.entity'

@UseGuards(AccessAuthGuard)
@Resolver(() => UserEntity)
export class UsersResolver {
  @Query(() => UserEntity)
  me(@GqlUser() user: UserEntity) {
    return user
  }
}
