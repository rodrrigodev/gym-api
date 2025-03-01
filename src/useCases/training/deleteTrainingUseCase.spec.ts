import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryTrainingRepository } from '@/repositories/inMemory/inMemoryTrainingRepository'
import { DeleteTrainingUseCase } from './deleteTrainingUseCase'
import { createTrainingTestHelper } from '@/tests/createTrainingTestHelper'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'

let inMemoryTrainingRepository: InMemoryTrainingRepository
let sut: DeleteTrainingUseCase

describe('delete training test', () => {
  beforeEach(() => {
    inMemoryTrainingRepository = new InMemoryTrainingRepository()
    sut = new DeleteTrainingUseCase(inMemoryTrainingRepository)
  })

  it('should be able to delete a training', async () => {
    const trainings = await createTrainingTestHelper(inMemoryTrainingRepository)

    const training = await sut.execute(trainings[2].id)

    expect(training).toEqual(
      expect.stringContaining('Training deleted successfully!'),
    )
  })

  it('should not be able to create a plan with same name', async () => {
    await expect(sut.execute('no')).rejects.toBeInstanceOf(
      TrainingNotFoundError,
    )
  })
})
