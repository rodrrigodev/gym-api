import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryPlanRepository } from '@/repositories/inMemory/inMemoryPlanRepository'
import { DeletePlanUseCase } from './deletePlanUseCase'
import { createPlanTestHelper } from '@/utils/tests/createPlanTestHelper'
import { PlanNotFoundError } from '@/errors/planNotFoundError'

let inMemoryPlanRepository: InMemoryPlanRepository
let sut: DeletePlanUseCase

describe('delete plan test', () => {
  beforeEach(() => {
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new DeletePlanUseCase(inMemoryPlanRepository)
  })

  it('should be able to delete a plan', async () => {
    const plan = await createPlanTestHelper(inMemoryPlanRepository)

    const message = await sut.execute(plan.id)

    expect(message).toBe('Success!')
  })

  it('should not be able to delete a plan passing wrong id', async () => {
    await createPlanTestHelper(inMemoryPlanRepository)

    await expect(sut.execute('wrong_id')).rejects.toBeInstanceOf(
      PlanNotFoundError,
    )
  })
})
