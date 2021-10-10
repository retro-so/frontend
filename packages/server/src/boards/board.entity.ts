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

import { UserEntity } from 'src/users'
import { ListEntity } from 'src/lists'

@Entity('board')
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  link: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity

  @Column()
  name: string

  @OneToMany(() => ListEntity, (list) => list.board)
  lists: ListEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  constructor(entity: Partial<BoardEntity>) {
    super()
    Object.assign(this, entity)
  }
}
