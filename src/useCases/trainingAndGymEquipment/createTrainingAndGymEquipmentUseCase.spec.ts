import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateTrainingAndGymEquipmentUseCase } from './createTrainingAndGymEquipmentUseCase'
import { InMemoryTrainingAndGymEquipmentRepository } from '@/repositories/inMemory/inMemoryTrainingAndGymEquipmentRepository'
import { InMemoryTrainingRepository } from '@/repositories/inMemory/inMemoryTrainingRepository'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { createTrainingTestHelper } from '@/tests/createTrainingTestHelper'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'

let inMemoryTrainingAndGymEquipmentRepository: InMemoryTrainingAndGymEquipmentRepository
let inMemoryTrainingRepository: InMemoryTrainingRepository
let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository

let sut: CreateTrainingAndGymEquipmentUseCase

describe('create training and gym equipment relation', () => {
  beforeEach(() => {
    inMemoryTrainingAndGymEquipmentRepository =
      new InMemoryTrainingAndGymEquipmentRepository()

    inMemoryTrainingRepository = new InMemoryTrainingRepository()
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()

    sut = new CreateTrainingAndGymEquipmentUseCase(
      inMemoryTrainingAndGymEquipmentRepository,
      inMemoryTrainingRepository,
      inMemoryGymEquipmentRepository,
    )
  })

  it('should be able to create training and gym equipment relation', async () => {
    const trainings = await createTrainingTestHelper(inMemoryTrainingRepository)
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const trainingAndGymEquipment = await sut.execute({
      trainingId: trainings[2].id,
      gymEquipmentIds: [gymEquipment.id],
    })

    expect(trainingAndGymEquipment.gymEquipment).toHaveLength(1)
    expect(trainingAndGymEquipment.trainingId).toEqual(expect.any(String))
  })

  it('should not be able to create training and gym equipment relation', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await expect(
      sut.execute({
        trainingId: 'wrongId',
        gymEquipmentIds: [gymEquipment.id],
      }),
    ).rejects.toBeInstanceOf(TrainingNotFoundError)
  })

  it('should not be able to create training and gym equipment relation', async () => {
    const trainings = await createTrainingTestHelper(inMemoryTrainingRepository)

    await expect(
      sut.execute({
        trainingId: trainings[2].id,
        gymEquipmentIds: ['wrongId'],
      }),
    ).rejects.toBeInstanceOf(EquipmentNotFoundError)
  })
})
