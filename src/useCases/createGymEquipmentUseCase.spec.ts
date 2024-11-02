import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateGymEquipmentUseCase } from './createGymEquipmentUseCase'
import { EquipmentAlreadyRegisteredError } from '@/errors/EquipmentAlreadyRegisteredError'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: CreateGymEquipmentUseCase

describe('create gym equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new CreateGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to create a gym equipment', async () => {
    const gymEquipment = await sut.execute({
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    expect(gymEquipment?.category).toBe('legs')
    expect(gymEquipment).toHaveProperty('id')
  })

  it('should not be able to create a gym equipment', async () => {
    await sut.execute({
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    await expect(
      sut.execute({
        name: 'Leg Press Machine',
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: 'LEG-001',
        status: 'available',
        last_maintenance: new Date(),
      }),
    ).rejects.toBeInstanceOf(EquipmentAlreadyRegisteredError)
  })
})
