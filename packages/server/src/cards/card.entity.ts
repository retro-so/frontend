import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Field, ObjectType, ID } from '@nestjs/graphql'

import { UserEntity } from 'src/users'
import { ListEntity } from 'src/lists'
import { BoardEntity } from 'src/boards'

@ObjectType('Card')
@Entity('card')
export class CardEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ default: 0 })
  index: number

  @Field()
  @ManyToOne(() => ListEntity)
  @JoinColumn({ name: 'list_id' })
  listId: string

  @Field()
  @ManyToOne(() => BoardEntity)
  @JoinColumn({ name: 'board_id' })
  boardId: string

  @Field()
  @Column()
  content: string

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity

  @Field()
  @Column({ default: false })
  solved: boolean
}
