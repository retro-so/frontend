import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column()
  login: string

  @Column({ name: 'display_name' })
  displayName: string

  @Column()
  email: string

  @Column({ name: 'avatar_url' })
  avatarUrl: string
}
