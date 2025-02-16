import { beforeEach, describe, expect, it } from '@jest/globals'
import { InvalidDateError } from '@/errors/invalidDateError'
import { CreateTrainingAndGymEquipmentUseCase } from './createTrainingAndGymEquipmentUseCase'
import { InMemoryTrainingAndGymEquipmentRepository } from '@/repositories/inMemory/inMemoryTrainingAndGymEquipmentRepository'
import { InMemoryTrainingRepository } from '@/repositories/inMemory/inMemoryTrainingRepository'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { createTrainingTestHelper } from '@/tests/createTrainingTestHelper'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'

let inMemoryTrainingAndGymEquipmentRepository: InMemoryTrainingAndGymEquipmentRepository
let trainingRepository: InMemoryTrainingRepository
let gymEquipmentRepository: InMemoryGymEquipmentRepository

let sut: CreateTrainingAndGymEquipmentUseCase

describe('create training and gym equipment relation', () => {
  beforeEach(() => {
    inMemoryTrainingAndGymEquipmentRepository =
      new InMemoryTrainingAndGymEquipmentRepository()

    trainingRepository = new InMemoryTrainingRepository()
    gymEquipmentRepository = new InMemoryGymEquipmentRepository()

    sut = new CreateTrainingAndGymEquipmentUseCase(
      inMemoryTrainingAndGymEquipmentRepository,
      trainingRepository,
      gymEquipmentRepository,
    )
  })

  it('should be able to create training and gym equipment relation', async () => {
    const training = await createTrainingTestHelper(trainingRepository)
    const gymEquipment = await createGymEquipmentTestHelper(
      gymEquipmentRepository,
    )

    const trainingAndGymEquipment = await sut.execute({
      gymEquipmentId: gymEquipment.id,
      trainingId: training.id,
    })

    console.log(trainingAndGymEquipment)
  })

  it.skip('should not be able to create a prize draw', async () => {
    await expect(
      sut.execute({
        prize: 'T-shirt violetfit',
        status: 'waiting',
        finishedAt: new Date(2023, 6, 10),
      }),
    ).rejects.toBeInstanceOf(InvalidDateError)
  })

  it.skip('should not be able to create a prize draw', async () => {
    await expect(
      sut.execute({
        prize: 'T-shirt violetfit',
        status: 'waiting',
        finishedAt: new Date(2023, 7, 12),
      }),
    ).rejects.toBeInstanceOf(InvalidDateError)
  })
})
