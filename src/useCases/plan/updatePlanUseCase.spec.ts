import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryPlanRepository } from '@/repositories/inMemory/inMemoryPlanRepository'
import { createPlanTestHelper } from '@/utils/tests/createPlanTestHelper'
import { UpdatePlanUseCase } from './updatePlanUseCase'
import { PlanAlreadyExistsError } from '@/errors/planAlreadyExistsError'
import { PlanNotFoundError } from '@/errors/planNotFoundError'

let inMemoryPlanRepository: InMemoryPlanRepository
let sut: UpdatePlanUseCase

describe('update user test', () => {
  beforeEach(() => {
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new UpdatePlanUseCase(inMemoryPlanRepository)
  })

  it('should be able to update a plan', async () => {
    const plan = await createPlanTestHelper(inMemoryPlanRepository)

    const planUpdated = await sut.execute({
      id: plan.id,
      name: 'Bronze',
      price: '125.00',
    })

    expect(planUpdated?.name).toBe('Bronze')
    expect(Number(planUpdated?.price) / 100).toBeCloseTo(125, 2)
  })

  it('should not be able to update a plan', async () => {
    const plan = await createPlanTestHelper(inMemoryPlanRepository)

    await expect(
      sut.execute({
        id: plan.id,
        name: 'Gold',
        price: '125.00',
      }),
    ).rejects.toBeInstanceOf(PlanAlreadyExistsError)
  })

  it('should not be able to update a plan twice with same name', async () => {
    const plan = await createPlanTestHelper(inMemoryPlanRepository)
    await expect(
      sut.execute({
        id: plan.id,
        name: 'Gold',
        price: '125.00',
      }),
    ).rejects.toBeInstanceOf(PlanAlreadyExistsError)
  })

  it('should not be able to update a plan passing wrong id', async () => {
    await createPlanTestHelper(inMemoryPlanRepository)

    await expect(
      sut.execute({
        id: 'wrongId',
        name: 'Gold',
        price: '125.00',
      }),
    ).rejects.toBeInstanceOf(PlanNotFoundError)
  })
})
