import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { FetchGymEquipmentUseCase } from './fetchGymEquipmentsUseCase'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: FetchGymEquipmentUseCase

describe('fetch gym  equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new FetchGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to fetch gym  equipment', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const gymEquipment = await sut.execute('legs')

    expect(gymEquipment).toHaveLength(26)
  })

  it('should not be able to fetch gym  equipment passing non-existent workout', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(sut.execute('noNextWorkout')).rejects.toBeInstanceOf(
      EquipmentNotFoundError,
    )
  })
})
