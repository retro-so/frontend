import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, BaseEntity } from 'typeorm'

import { UserEntity } from 'src/users'

import { CardEntity } from './card.entity'

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

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string

  @Column({ name: 'card_id', type: 'uuid' })
  cardId: string

  constructor(entity: Partial<LikeEntity>) {
    super()
    Object.assign(this, entity)
  }
}
