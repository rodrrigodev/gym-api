import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { FetchGymEquipmentsUseCase } from './fetchGymEquipmentsUseCase'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: FetchGymEquipmentsUseCase

describe('fetch gym equipments test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new FetchGymEquipmentsUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to fetch gym equipments', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const gymEquipments = await sut.execute('legs')

    expect(gymEquipments).toHaveLength(26)
  })

  it('should not be able to fetch gym equipments passing non-existent workout', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(sut.execute('noNextWorkout')).rejects.toBeInstanceOf(
      EquipmentsNotFoundError,
    )
  })
})
