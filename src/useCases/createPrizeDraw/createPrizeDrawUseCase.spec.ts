import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { CreatePrizeDrawUseCase } from './createPrizeDrawUseCase'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'
import { InvalidDateError } from '@/errors/invalidDateError'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let sut: CreatePrizeDrawUseCase

describe('create a prize draw test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 6, 10) })
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    sut = new CreatePrizeDrawUseCase(inMemoryPrizeDrawRepository)
  })

  it('should be able to create a prize draw', async () => {
    const prizeDraw = await sut.execute({
      prize: 'T-shirt violetfit',
      status: 'waiting',
      finishedAt: new Date(2023, 7, 10),
    })

    expect(prizeDraw.prize).toBe('T-shirt violetfit')
    expect(prizeDraw.status).toBe('waiting')
  })

  it('should not be able to create a prize draw', async () => {
    await expect(
      sut.execute({
        prize: 'T-shirt violetfit',
        status: 'waiting',
        finishedAt: new Date(2023, 6, 10),
      }),
    ).rejects.toBeInstanceOf(InvalidDateError)
  })

  it('should not be able to create a prize draw', async () => {
    await expect(
      sut.execute({
        prize: 'T-shirt violetfit',
        status: 'waiting',
        finishedAt: new Date(2023, 7, 12),
      }),
    ).rejects.toBeInstanceOf(InvalidDateError)
  })
})
