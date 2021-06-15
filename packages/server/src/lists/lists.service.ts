import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListEntity } from './list.entity'
import { CreateListInput, UpdateListInput } from './list.input'

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepo: Repository<ListEntity>,
  ) {}

  async createList(listData: CreateListInput): Promise<ListEntity> {
    // TODO: Rewirte to entity instance.
    return this.listRepo.save(listData)
  }

  async updateList(listData: UpdateListInput): Promise<ListEntity> {
    const list = await this.listRepo.findOne({ id: listData.id })

    if (!list) {
      // TODO: Add validation.
      throw new Error('')
    }

    Object.assign(list, listData)

    await list.save()

    return list
  }

  async removeList(listId: string): Promise<ListEntity> {
    const list = await this.listRepo.findOne({ id: listId })

    if (!list) {
      // TODO: Add validation.
      throw new Error('')
    }

    await this.listRepo.delete({ id: list.id })

    return list
  }
}
