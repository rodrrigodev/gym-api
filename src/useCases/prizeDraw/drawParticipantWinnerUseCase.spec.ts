import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'
import { createPrizeDrawTestHelper } from '@/tests/createPrizeDrawTestHelper'
import { DrawParticipantWinnerUseCase } from './drawParticipantWinnerUseCase'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'
import { DrawNotPossibleError } from '@/errors/drawNotPossibleError'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: DrawParticipantWinnerUseCase

describe('fetch prize draws test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 6, 10) })

    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DrawParticipantWinnerUseCase(
      inMemoryPrizeDrawRepository,
      inMemoryUserRepository,
    )
  })

  it('should be able to draw participant winner', async () => {
    const { id } = await createPrizeDrawTestHelper(inMemoryPrizeDrawRepository)
    await createUsersTestHelper(inMemoryUserRepository)

    const prizeDrawWinner = await sut.execute(id)

    expect(prizeDrawWinner?.prize).toBe('Capinha violetfit')
    expect(prizeDrawWinner?.status).toBe('finished')
  })

  it('should not be able to draw participant winner passing wrong prize id', async () => {
    await createPrizeDrawTestHelper(inMemoryPrizeDrawRepository)
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute('wrongId')).rejects.toBeInstanceOf(
      PrizeDrawNotFoundError,
    )
  })

  it('should not be able to draw participant winner if status is finished', async () => {
    const { id } = await inMemoryPrizeDrawRepository.createPrizeDraw({
      prize: 'Creatina violet gym',
      finished_at: new Date(2023, 7, 2),
      status: 'finished',
    })
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute(id)).rejects.toBeInstanceOf(DrawNotPossibleError)
  })

  it('should not be able to draw participant winner with a date less than or equal to 5 days from the current date', async () => {
    const { id } = await inMemoryPrizeDrawRepository.createPrizeDraw({
      prize: 'Creatina violet gym',
      finished_at: new Date(2023, 6, 13),
      status: 'finished',
    })
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute(id)).rejects.toBeInstanceOf(DrawNotPossibleError)
  })
})
