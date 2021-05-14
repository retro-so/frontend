import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Field, ObjectType, ID } from '@nestjs/graphql'

import { UserEntity } from 'src/users'
import { ListEntity } from 'src/lists'

@ObjectType('Card')
@Entity('card')
export class CardEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ default: 0 })
  index: number

  @ManyToOne(() => ListEntity)
  @JoinColumn({ name: 'list_id' })
  list: string

  @Field()
  @Column()
  content: string

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity
}
