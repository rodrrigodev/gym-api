import { beforeEach, describe, expect, it } from '@jest/globals'
import { UpdateEquipmentTrackingUseCase } from './updateEquipmentTrackingUseCase'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { createGymEquipmentTestHelper } from '@/utils/tests/createGymEquipmentTestHelper'

let inMemoryEquipmentTrackingRepository: InMemoryEquipmentTrackingRepository
let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: UpdateEquipmentTrackingUseCase

describe('update gym equipment test', () => {
  beforeEach(() => {
    inMemoryEquipmentTrackingRepository =
      new InMemoryEquipmentTrackingRepository()
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new UpdateEquipmentTrackingUseCase(
      inMemoryEquipmentTrackingRepository,
    )
  })

  it('should be able to update a equipment tracking', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await inMemoryEquipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipment.id,
      user_progress_id: 'user_id',
    })

    const updatedEquipmentTracking = await sut.execute(
      gymEquipment.id,
      'user_id',
      6,
    )

    expect(updatedEquipmentTracking?.actual_weight).toBe(6)
  })

  it('should not be able to update a equipment tracking passing wrong user_id', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await inMemoryEquipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipment.id,
      user_progress_id: 'user_id',
    })

    await expect(
      sut.execute(gymEquipment.id, 'wrong_user_id', 6),
    ).rejects.toBeInstanceOf(EquipmentTrackingNotFoundError)
  })

  it('should not be able to update a equipment tracking passing wrong gym_id', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await inMemoryEquipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipment.id,
      user_progress_id: 'user_id',
    })

    await expect(
      sut.execute('wrong_gym_id', 'user_id', 6),
    ).rejects.toBeInstanceOf(EquipmentTrackingNotFoundError)
  })
})
