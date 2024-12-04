import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'
import { createPrizeDrawTestHelper } from '@/utils/tests/createPrizeDrawTestHelper'
import { FetchPrizeDrawsUseCase } from './fetchPrizeDrawsUseCase'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let sut: FetchPrizeDrawsUseCase

describe('fetch prize draws test', () => {
  beforeEach(() => {
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    sut = new FetchPrizeDrawsUseCase(inMemoryPrizeDrawRepository)
  })

  it('should be able to fetch prize draws', async () => {
    await createPrizeDrawTestHelper(inMemoryPrizeDrawRepository)

    const prizeDraws = await sut.execute()

    expect(prizeDraws).toHaveLength(3)
    expect(prizeDraws[0].prize).toBe('Garrafa violetfit 1.5')
  })
})
