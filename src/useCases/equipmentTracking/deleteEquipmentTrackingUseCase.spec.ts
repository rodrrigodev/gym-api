import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { DeleteEquipmentTrackingUseCase } from './deleteEquipmentTrackingUseCase'
import { createEquipmentTrackingTestHelper } from '@/tests/createEquipmentTrackingTestHelper'

let inMemoryEquipmentTrackingRepository: InMemoryEquipmentTrackingRepository
let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: DeleteEquipmentTrackingUseCase

describe('update gym equipment tracking test', () => {
  beforeEach(() => {
    inMemoryEquipmentTrackingRepository =
      new InMemoryEquipmentTrackingRepository()
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new DeleteEquipmentTrackingUseCase(
      inMemoryEquipmentTrackingRepository,
    )
  })

  it('should be able to delete an equipment tracking', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const equipmentTracking = await createEquipmentTrackingTestHelper(
      inMemoryEquipmentTrackingRepository,
      gymEquipment.id,
      'user_id',
    )

    const message = await sut.execute(equipmentTracking.id)

    expect(message).toEqual(
      expect.stringContaining('Equipment tracking deleted successfully!'),
    )
  })

  it('should not be able to delete an equipment tracking passing wrong user_id', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await createEquipmentTrackingTestHelper(
      inMemoryEquipmentTrackingRepository,
      gymEquipment.id,
      'user_id',
    )

    await expect(sut.execute(gymEquipment.id)).rejects.toBeInstanceOf(
      EquipmentTrackingNotFoundError,
    )
  })

  it('should not be able to delete an equipment tracking passing wrong equipmentTrackingId', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await inMemoryEquipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipment.id,
      user_progress_id: 'user_id',
      active: true,
    })

    await expect(
      sut.execute('wrong_equipmentTrackingId'),
    ).rejects.toBeInstanceOf(EquipmentTrackingNotFoundError)
  })
})
