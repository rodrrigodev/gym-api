import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreatePrizeDrawUseCase } from './createPrizeDrawUseCase'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let sut: CreatePrizeDrawUseCase

describe('update a prize draw test', () => {
  beforeEach(() => {
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    sut = new CreatePrizeDrawUseCase(inMemoryPrizeDrawRepository)
  })

  it.todo('should be able to update a prize draw')
})
