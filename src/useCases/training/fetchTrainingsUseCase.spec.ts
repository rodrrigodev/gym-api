import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryTrainingRepository } from '@/repositories/inMemory/inMemoryTrainingRepository'
import { createTrainingTestHelper } from '@/tests/createTrainingTestHelper'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { FetchTrainingsUseCase } from './fetchTrainingsUseCase'

let inMemoryTrainingRepository: InMemoryTrainingRepository
let sut: FetchTrainingsUseCase

describe('fetch trainings test', () => {
  beforeEach(() => {
    inMemoryTrainingRepository = new InMemoryTrainingRepository()
    sut = new FetchTrainingsUseCase(inMemoryTrainingRepository)
  })

  it('should be able to fetch trainings', async () => {
    await createTrainingTestHelper(inMemoryTrainingRepository)

    const training = await sut.execute()

    expect(training).toHaveLength(3)
    expect(training[0].gender).toEqual(expect.any(String))
  })

  it('should not be able to fetch training', async () => {
    await expect(sut.execute()).rejects.toBeInstanceOf(TrainingNotFoundError)
  })
})
