import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { FetchEquipmentTrackingDetailsUseCase } from './fetchEquipmentTrackingDetailsUseCase'
import { createEquipmentTrackingTestHelper } from '@/tests/createEquipmentTrackingTestHelper'
import { randomUUID } from 'node:crypto'
import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'

let inMemoryEquipmentTrackingRepository: InMemoryEquipmentTrackingRepository

let sut: FetchEquipmentTrackingDetailsUseCase

describe('fetch gym equipment tracking test', () => {
  beforeEach(() => {
    inMemoryEquipmentTrackingRepository =
      new InMemoryEquipmentTrackingRepository()

    sut = new FetchEquipmentTrackingDetailsUseCase(
      inMemoryEquipmentTrackingRepository,
    )
  })

  it('should be able to fetch gym equipment tracking details', async () => {
    const gymEquipmentTracking = await createEquipmentTrackingTestHelper(
      inMemoryEquipmentTrackingRepository,
      randomUUID(),
      randomUUID(),
    )

    const equipmentTrackingDetails = await sut.execute({
      equipmentIds: [gymEquipmentTracking.gym_equipment_id],
      userProgressId: gymEquipmentTracking.user_progress_id,
    })

    expect(equipmentTrackingDetails).toHaveLength(1)
  })

  it('should not be able to fetch an equipment tracking details', async () => {
    const gymEquipmentTracking = await createEquipmentTrackingTestHelper(
      inMemoryEquipmentTrackingRepository,
      randomUUID(),
      randomUUID(),
    )

    await expect(
      sut.execute({
        equipmentIds: ['wrongId'],
        userProgressId: gymEquipmentTracking.user_progress_id,
      }),
    ).rejects.toBeInstanceOf(EquipmentTrackingNotFoundError)
  })
})
