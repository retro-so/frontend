import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Column, BaseEntity } from 'typeorm'
import { Field, ObjectType, ID } from '@nestjs/graphql'

import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'

@ObjectType('Like')
@Entity('like')
export class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity // Use this field only for join relations.

  @ManyToOne(() => CardEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: CardEntity // Use this field only for join relations.

  @Column({ name: 'board_id', type: 'uuid' })
  boardId: string

  @Field(() => ID)
  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string

  @Field(() => ID)
  @Column({ name: 'card_id', type: 'uuid' })
  cardId: string

  constructor(entity: Partial<LikeEntity>) {
    super()
    Object.assign(this, entity)
  }
}
