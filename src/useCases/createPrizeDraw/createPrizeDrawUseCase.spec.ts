import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreatePrizeDrawUseCase } from './createPrizeDrawUseCase'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let sut: CreatePrizeDrawUseCase

describe('create a prize draw test', () => {
  beforeEach(() => {
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    sut = new CreatePrizeDrawUseCase(inMemoryPrizeDrawRepository)
  })

  it('should be able to create a prize draw', async () => {
    const prizeDraw = await sut.execute({
      prize: 'T-shirt violetfit',
      status: 'waiting',
    })

    expect(prizeDraw.prize).toBe('T-shirt violetfit')
    expect(prizeDraw.status).toBe('waiting')
  })
})
