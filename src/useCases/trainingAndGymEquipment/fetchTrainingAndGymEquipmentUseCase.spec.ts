import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryTrainingAndGymEquipmentRepository } from '@/repositories/inMemory/inMemoryTrainingAndGymEquipmentRepository'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { FetchTrainingAndGymEquipmentUseCase } from './fetchTrainingAndGymEquipmentUseCase'
import { randomUUID } from 'crypto'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'

let inMemoryTrainingAndGymEquipmentRepository: InMemoryTrainingAndGymEquipmentRepository
let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository

let sut: FetchTrainingAndGymEquipmentUseCase

describe('fetch training and gym equipment', () => {
  beforeEach(() => {
    inMemoryTrainingAndGymEquipmentRepository =
      new InMemoryTrainingAndGymEquipmentRepository()

    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()

    sut = new FetchTrainingAndGymEquipmentUseCase(
      inMemoryTrainingAndGymEquipmentRepository,
      inMemoryGymEquipmentRepository,
    )
  })

  it('should be able to fetch training and gym equipment', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const trainingId = randomUUID()

    await inMemoryTrainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
      {
        trainingId,
        gymEquipmentIds: [gymEquipment.id],
      },
    )

    const trainingAndGymEquipment = await sut.execute(trainingId)

    expect(trainingAndGymEquipment).toHaveProperty('trainingId')
    expect(trainingAndGymEquipment).toHaveProperty('gymEquipment')
    expect(trainingAndGymEquipment.gymEquipment).toHaveLength(1)
  })

  it('should not be able to fetch training and gym equipment', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const trainingId = randomUUID()

    await inMemoryTrainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
      {
        trainingId,
        gymEquipmentIds: [gymEquipment.id],
      },
    )

    await expect(sut.execute('wrongId')).rejects.toBeInstanceOf(
      TrainingNotFoundError,
    )
  })

  it('should not be able to fetch training and gym equipment', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const trainingId = randomUUID()

    await inMemoryTrainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
      {
        trainingId,
        gymEquipmentIds: [randomUUID()],
      },
    )

    await expect(sut.execute(trainingId)).rejects.toBeInstanceOf(
      EquipmentNotFoundError,
    )
  })
})
