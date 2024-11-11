import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { FetGymEquipmentUseCase } from './fetchGymEquipmentsUseCase'
import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: FetGymEquipmentUseCase

describe('fetch gym equipments test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new FetGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to fetch gym equipments', async () => {
    await inMemoryGymEquipmentRepository.createGymEquipment({
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    const gymEquipments = await sut.execute('legs')

    expect(gymEquipments).toHaveLength(1)
    expect(gymEquipments[0]).toEqual(
      expect.objectContaining({ name: 'Leg Press Machine' }),
    )
  })

  it('should not be able to fetch gym equipments', async () => {
    await inMemoryGymEquipmentRepository.createGymEquipment({
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    await expect(sut.execute('noNextWorkout')).rejects.toBeInstanceOf(
      EquipmentsNotFoundError,
    )
  })
})
