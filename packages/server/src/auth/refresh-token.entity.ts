import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'refresh_token' })
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string

  @Column({ type: 'varchar' })
  token: string

  @Column({ type: 'varchar' })
  ip: string

  @Column({ name: 'user_agent' })
  userAgent: string

  @Column({ type: 'bigint', name: 'expires_in' })
  expiresIn: number

  constructor(entity: Partial<RefreshTokenEntity>) {
    Object.assign(this, entity)
  }
}
