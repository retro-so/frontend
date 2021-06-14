import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm'
import { Field, ObjectType, ID } from '@nestjs/graphql'

import { UserEntity } from 'src/users'
import { ListEntity } from 'src/lists'
import { BoardEntity } from 'src/boards'
import { LikeEntity } from './LikeEntity'

export type CardId = string

@ObjectType('Card')
@Entity('card')
export class CardEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: CardId

  @Field()
  @Column({ default: 0 })
  index: number

  @ManyToOne(() => ListEntity)
  @JoinColumn({ name: 'list_id' })
  list: ListEntity // Use this field only for join relations.

  @Field()
  @Column({ name: 'list_id', type: 'uuid' })
  listId: string

  @ManyToOne(() => BoardEntity)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity // Use this field only for join relations.

  @Field(() => ID)
  @Column({ name: 'board_id', type: 'uuid' })
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

  @Field(() => [LikeEntity])
  @OneToMany(() => LikeEntity, (like) => like.card)
  likes: LikeEntity[]

  constructor(entity: Partial<CardEntity>) {
    super()
    Object.assign(this, entity)
  }
}
