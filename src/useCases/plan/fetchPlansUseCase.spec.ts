import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryPlanRepository } from '@/repositories/inMemory/inMemoryPlanRepository'
import { FetchPlansUseCase } from './fetchPlansUseCase'
import { createPlanTestHelper } from '@/utils/tests/createPlanTestHelper'

let inMemoryPlanRepository: InMemoryPlanRepository
let sut: FetchPlansUseCase

describe('fetch plans test', () => {
  beforeEach(() => {
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new FetchPlansUseCase(inMemoryPlanRepository)
  })

  it('should be able to fetch plans', async () => {
    await createPlanTestHelper(inMemoryPlanRepository)

    const plans = await sut.execute()

    expect(plans).toHaveLength(2)
    expect(plans[0]).toHaveProperty('name')
  })
})
