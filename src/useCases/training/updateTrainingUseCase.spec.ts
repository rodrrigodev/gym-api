import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryTrainingRepository } from '@/repositories/inMemory/inMemoryTrainingRepository'
import { createTrainingTestHelper } from '@/tests/createTrainingTestHelper'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { UpdateTrainingsUseCase } from './updateTrainingUseCase'

let inMemoryTrainingRepository: InMemoryTrainingRepository
let sut: UpdateTrainingsUseCase

describe('update training test', () => {
  beforeEach(() => {
    inMemoryTrainingRepository = new InMemoryTrainingRepository()
    sut = new UpdateTrainingsUseCase(inMemoryTrainingRepository)
  })

  it('should be able to update a training', async () => {
    const trainings = await createTrainingTestHelper(inMemoryTrainingRepository)

    const training = await sut.execute({
      id: trainings[2].id,
      level: 'Intermediate',
      age_group: '35-40',
    })

    expect(training?.level).toEqual(expect.stringContaining('Intermediate'))
    expect(training?.age_group).toEqual(expect.stringContaining('35-40'))
  })

  it('should not be able to update a training', async () => {
    await expect(sut.execute({ id: 'wrong' })).rejects.toBeInstanceOf(
      TrainingNotFoundError,
    )
  })
})
