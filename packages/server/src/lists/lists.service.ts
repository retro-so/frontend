import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListEntity } from './list.entity'
import { CreateListInput } from './list.input'

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepo: Repository<ListEntity>,
  ) {}

  async createList(list: CreateListInput) {
    return this.listRepo.save(list)
  }
}
