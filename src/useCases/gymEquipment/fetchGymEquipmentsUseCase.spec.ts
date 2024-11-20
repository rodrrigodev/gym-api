import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { createGymEquipmentTestHelper } from '@/utils/tests/createGymEquipmentTestHelper'
import { FetchGymEquipmentUseCase } from './fetchGymEquipmentsUseCase'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: FetchGymEquipmentUseCase

describe('fetch gym equipments test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new FetchGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to fetch gym equipments', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const gymEquipments = await sut.execute('legs')

    expect(gymEquipments).toHaveLength(1)
    expect(gymEquipments[0]).toEqual(
      expect.objectContaining({ name: 'Leg Press Machine' }),
    )
  })

  it('should not be able to fetch gym equipments passing non-existent workout', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(sut.execute('noNextWorkout')).rejects.toBeInstanceOf(
      EquipmentsNotFoundError,
    )
  })
})
