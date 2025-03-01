import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryTrainingAndGymEquipmentRepository } from '@/repositories/inMemory/inMemoryTrainingAndGymEquipmentRepository'
import { DeleteTrainingAndGymEquipmentUseCase } from './deleteTrainingAndGymEquipmentUseCase'
import { randomUUID } from 'crypto'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'

let inMemoryTrainingAndGymEquipmentRepository: InMemoryTrainingAndGymEquipmentRepository

let sut: DeleteTrainingAndGymEquipmentUseCase

describe('delete training and gym equipment relation', () => {
  beforeEach(() => {
    inMemoryTrainingAndGymEquipmentRepository =
      new InMemoryTrainingAndGymEquipmentRepository()

    sut = new DeleteTrainingAndGymEquipmentUseCase(
      inMemoryTrainingAndGymEquipmentRepository,
    )
  })

  it('should be able to delete training and gym equipment relation', async () => {
    const trainingId = randomUUID()
    const gymEquipmentIds = [randomUUID()]

    await inMemoryTrainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
      {
        trainingId,
        gymEquipmentIds,
      },
    )

    const trainingAndGymEquipment = await sut.execute({
      trainingId,
      gymEquipmentId: gymEquipmentIds[0],
    })

    expect(trainingAndGymEquipment).toEqual(
      expect.stringContaining('Gym equipment removed from training!'),
    )
  })

  it('should not be able to delete training and gym equipment relation', async () => {
    const trainingId = randomUUID()
    const gymEquipmentIds = [randomUUID()]

    await inMemoryTrainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
      {
        trainingId,
        gymEquipmentIds,
      },
    )

    await expect(
      sut.execute({
        trainingId: 'wrongId',
        gymEquipmentId: gymEquipmentIds[0],
      }),
    ).rejects.toBeInstanceOf(TrainingNotFoundError)
  })

  it('should not be able to create training and gym equipment relation', async () => {
    const trainingId = randomUUID()
    const gymEquipmentIds = [randomUUID()]

    await inMemoryTrainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
      {
        trainingId,
        gymEquipmentIds,
      },
    )

    await expect(
      sut.execute({
        trainingId,
        gymEquipmentId: 'wrongId',
      }),
    ).rejects.toBeInstanceOf(EquipmentNotFoundError)
  })
})
