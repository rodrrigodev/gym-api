import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'
import { createPrizeDrawTestHelper } from '@/utils/tests/createPrizeDrawTestHelper'
import { GeneratePrizeDrawWinnerUseCase } from './generatePrizeDrawWinnerUseCase'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { createUserTestHelper } from '@/utils/tests/createUserTestHelper'
import { DrawNotPossibleError } from '@/errors/drawNotPossibleError'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: GeneratePrizeDrawWinnerUseCase

describe('update a prize draw test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 6, 10) })
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GeneratePrizeDrawWinnerUseCase(
      inMemoryPrizeDrawRepository,
      inMemoryUserRepository,
    )
  })

  it('should be able to generate a prize draw winner', async () => {
    await createUserTestHelper(inMemoryUserRepository)
    const prizeDraw = await createPrizeDrawTestHelper(
      inMemoryPrizeDrawRepository,
    )

    const prizeDrawResult = await sut.execute(prizeDraw.id)

    expect(prizeDrawResult).toHaveProperty('prize', 'Capinha violetfit')
    expect(prizeDrawResult).toHaveProperty('status', 'finished')
  })

  it('should not be able to generate a prize draw winner', async () => {
    await createUserTestHelper(inMemoryUserRepository)
    const prizeDraw = await inMemoryPrizeDrawRepository.createPrizeDraw({
      prize: 'Suplemento King',
      status: 'waiting',
      finished_at: new Date(2023, 6, 3),
    })

    await expect(sut.execute(prizeDraw.id)).rejects.toBeInstanceOf(
      DrawNotPossibleError,
    )
  })

  it('should not be able to generate a prize draw winner', async () => {
    await createUserTestHelper(inMemoryUserRepository)
    const prizeDraw = await inMemoryPrizeDrawRepository.createPrizeDraw({
      prize: 'Suplemento King',
      status: 'finished',
      finished_at: new Date(2023, 6, 30),
    })

    await expect(sut.execute(prizeDraw.id)).rejects.toBeInstanceOf(
      DrawNotPossibleError,
    )
  })
})
