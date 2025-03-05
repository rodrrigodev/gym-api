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

    const { length, trainings } = await sut.execute(1)

    expect(length).toBe(1)
    expect(trainings[0].gender).toEqual(expect.any(String))
  })

  it('should not be able to fetch training', async () => {
    await expect(sut.execute(1)).rejects.toBeInstanceOf(TrainingNotFoundError)
  })
})
