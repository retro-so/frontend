import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType('User')
@Entity({ name: 'user' })
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  provider: string

  @Field()
  @Column()
  login: string

  @Field()
  @Column({ name: 'display_name' })
  displayName: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column({ name: 'avatar_url' })
  avatarUrl: string
}
