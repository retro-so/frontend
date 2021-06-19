import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm'
import { Field, ID, ObjectType } from '@nestjs/graphql'

import { UserEntity } from 'src/users'
import { ListEntity } from 'src/lists'

@ObjectType('Board')
@Entity('board')
export class BoardEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  link: string

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity

  @Field()
  @Column()
  name: string

  @Field(() => [ListEntity])
  @OneToMany(() => ListEntity, (list) => list.board)
  lists: ListEntity[]

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  constructor(entity: Partial<BoardEntity>) {
    super()
    Object.assign(this, entity)
  }
}
