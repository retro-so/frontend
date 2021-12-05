import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm'

import { BoardEntity } from 'src/boards'
import { CardEntity } from 'src/cards'

@Entity('list')
export class ListEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 0 })
  index: number

  @ManyToOne(() => BoardEntity)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity

  @Column({ name: 'board_id', type: 'uuid' })
  boardId: string

  @Column()
  name: string

  @OneToMany(() => CardEntity, (card) => card.list)
  cards: CardEntity[]

  @Column({
    type: 'enum',
    enum: ['green', 'yellow', 'blue', 'red', 'gray', 'mint'],
    default: 'gray',
  })
  color: 'green' | 'yellow' | 'blue' | 'red' | 'gray' | 'mint'
}
