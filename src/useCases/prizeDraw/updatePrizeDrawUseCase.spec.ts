import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'
import { UpdatePrizeDrawUseCase } from './updatePrizeDrawUseCase'
import { createPrizeDrawTestHelper } from '@/tests/createPrizeDrawTestHelper'
import { InvalidDateError } from '@/errors/invalidDateError'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let sut: UpdatePrizeDrawUseCase

describe('update a prize draw test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 6, 10) })
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    sut = new UpdatePrizeDrawUseCase(inMemoryPrizeDrawRepository)
  })

  it('should be able to update a prize draw', async () => {
    const prizeDraw = await createPrizeDrawTestHelper(
      inMemoryPrizeDrawRepository,
    )

    const prizeDrawUpdated = await sut.execute({
      id: prizeDraw.id,
      prize: 'Caneca Violetfit',
    })

    expect(prizeDrawUpdated?.prize).toBe('Caneca Violetfit')
  })

  it('should be able to update a prize draw', async () => {
    const prizeDraw = await createPrizeDrawTestHelper(
      inMemoryPrizeDrawRepository,
    )

    const prizeDrawUpdated = await sut.execute({
      id: prizeDraw.id,
      prize: 'Mochila Violetfit',
      finishedAt: new Date(2023, 7, 8),
    })

    expect(prizeDrawUpdated?.prize).toBe('Mochila Violetfit')
    expect(prizeDrawUpdated?.finished_at).toStrictEqual(new Date(2023, 7, 8))
  })

  it('should not be able to update a prize draw passing invalide date', async () => {
    const prizeDraw = await createPrizeDrawTestHelper(
      inMemoryPrizeDrawRepository,
    )

    await expect(
      sut.execute({
        id: prizeDraw.id,
        prize: 'Mochila Violetfit',
        finishedAt: new Date(2023, 6, 5),
      }),
    ).rejects.toBeInstanceOf(InvalidDateError)
  })

  it('should not be able to update a prize draw passing invalide date', async () => {
    const prizeDraw = await createPrizeDrawTestHelper(
      inMemoryPrizeDrawRepository,
    )

    await expect(
      sut.execute({
        id: prizeDraw.id,
        prize: 'Mochila Violetfit',
        finishedAt: new Date(2023, 8, 15),
      }),
    ).rejects.toBeInstanceOf(InvalidDateError)
  })
})
