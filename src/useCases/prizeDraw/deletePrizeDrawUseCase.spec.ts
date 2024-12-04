import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryPrizeDrawRepository } from '@/repositories/inMemory/inMemoryPrizeDrawRepository'
import { DeletePrizeDrawUseCase } from './deletePrizeDrawUseCase'
import { createPrizeDrawTestHelper } from '@/utils/tests/createPrizeDrawTestHelper'
import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'

let inMemoryPrizeDrawRepository: InMemoryPrizeDrawRepository
let sut: DeletePrizeDrawUseCase

describe('delete a prize draw test', () => {
  beforeEach(() => {
    inMemoryPrizeDrawRepository = new InMemoryPrizeDrawRepository()
    sut = new DeletePrizeDrawUseCase(inMemoryPrizeDrawRepository)
  })

  it('should be able to delete a prize draw', async () => {
    const prizeDraw = await createPrizeDrawTestHelper(
      inMemoryPrizeDrawRepository,
    )

    const message = await sut.execute(prizeDraw.id)

    expect(message).toBe('Success!')
  })

  it('should not be able to delete a prize draw passing wrong id', async () => {
    await createPrizeDrawTestHelper(inMemoryPrizeDrawRepository)

    await expect(sut.execute('wrongId')).rejects.toBeInstanceOf(
      PrizeDrawNotFoundError,
    )
  })
})
