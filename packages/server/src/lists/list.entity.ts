import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { BoardEntity } from 'src/boards'
import { CardEntity } from 'src/cards'

@ObjectType('List')
@Entity('list')
export class ListEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Int)
  @Column({ default: 0 })
  index: number

  @ManyToOne(() => BoardEntity)
  @JoinColumn({ name: 'board_id' })
  board: string

  @Field()
  @Column()
  name: string

  @Field(() => [CardEntity])
  @OneToMany(() => CardEntity, (card) => card.list)
  cards: CardEntity[]
}
