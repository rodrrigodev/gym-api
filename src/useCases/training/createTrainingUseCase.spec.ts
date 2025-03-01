import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryTrainingRepository } from '@/repositories/inMemory/inMemoryTrainingRepository'
import { CreateTrainingUseCase } from './createTrainingUsecase'

let inMemoryTrainingRepository: InMemoryTrainingRepository
let sut: CreateTrainingUseCase

describe('create training test', () => {
  beforeEach(() => {
    inMemoryTrainingRepository = new InMemoryTrainingRepository()
    sut = new CreateTrainingUseCase(inMemoryTrainingRepository)
  })

  it('should be able to create a training', async () => {
    const training = await sut.execute({
      age_group: '20-30',
      category: 'legs',
      gender: 'male',
      level: 'beginner',
      type: 'bulk-up',
    })

    expect(training.level).toEqual(expect.stringContaining('beginner'))
    expect(training.age_group).toEqual(expect.any(String))
  })
})
