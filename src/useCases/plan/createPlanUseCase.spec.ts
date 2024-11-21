import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreatePlanUseCase } from './createPlanUseCase'
import { InMemoryPlanRepository } from '@/repositories/inMemory/inMemoryPlanRepository'
import { PlanAlreadyExistsError } from '@/errors/planAlreadyExistsError'

let inMemoryPlanRepository: InMemoryPlanRepository
let sut: CreatePlanUseCase

describe('create plan test', () => {
  beforeEach(() => {
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new CreatePlanUseCase(inMemoryPlanRepository)
  })

  it('should be able to create a plan', async () => {
    const plan = await sut.execute({
      name: 'Basic',
      price: '140.00',
    })

    expect(plan.name).toBe('Basic')
    expect(Number(plan.price) / 100).toBeCloseTo(140, 2)
  })

  it('should not be able to create a plan with same name', async () => {
    await sut.execute({
      name: 'Basic',
      price: '140.00',
    })

    await expect(
      sut.execute({
        name: 'Basic',
        price: '140.00',
      }),
    ).rejects.toBeInstanceOf(PlanAlreadyExistsError)
  })
})
