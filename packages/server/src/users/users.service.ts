import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './create-user.dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

  async findOneOrCreate(userDto: CreateUserDto) {
    const user = await this.userRepo.findOne({ email: userDto.email })

    if (!user) {
      return this.userRepo.save(userDto)
    }

    return user
  }

  async findOneById(id: string) {
    const user = this.userRepo.findOne({ id })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    return user
  }
}
