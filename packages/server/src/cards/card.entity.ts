import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm'

import { UserEntity } from 'src/users'
import { ListEntity } from 'src/lists'
import { BoardEntity } from 'src/boards'
import { LikeEntity } from './LikeEntity'

export type CardId = string

@Entity('card')
export class CardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CardId

  @Column({ default: 0 })
  index: number

  @ManyToOne(() => ListEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list: ListEntity // Use this field only for join relations.

  @Column({ name: 'list_id', type: 'uuid' })
  listId: string

  @ManyToOne(() => BoardEntity)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity // Use this field only for join relations.

  @Column({ name: 'board_id', type: 'uuid' })
  boardId: string

  @Column()
  content: string

  @ManyToOne(() => UserEntity, { eager: true }) // Use eager for load relations.
  @JoinColumn({ name: 'author_id' })
  author: UserEntity

  @Column({ default: false })
  solved: boolean

  @OneToMany(() => LikeEntity, (like) => like.card, { eager: true }) // Use eager for load relations.
  likes: LikeEntity[]

  constructor(entity: Partial<CardEntity>) {
    super()
    Object.assign(this, entity)
  }
}
