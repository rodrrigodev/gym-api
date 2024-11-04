import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { UpdateGymEquipmentUseCase } from './updateGymEquipmentUseCase'
import { CreateGymEquipmentUseCase } from './createGymEquipmentUseCase'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let createGymEquipmentUseCase: CreateGymEquipmentUseCase
let sut: UpdateGymEquipmentUseCase

describe('update gym equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    createGymEquipmentUseCase = new CreateGymEquipmentUseCase(
      inMemoryGymEquipmentRepository,
    )
    sut = new UpdateGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to update a gym equipment', async () => {
    await createGymEquipmentUseCase.execute({
      id: 'equipment-id',
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    const updatedGymEquipment = await sut.execute('equipment-id', {
      name: 'Seated Dip Machine',
      sets: 3,
    })

    expect(updatedGymEquipment?.name).toBe('Seated Dip Machine')
    expect(updatedGymEquipment?.sets).toBe(3)
    expect(updatedGymEquipment).toHaveProperty('cod', 'LEG-001')
  })

  it('should not be able to update a gym equipment', async () => {
    await createGymEquipmentUseCase.execute({
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    await createGymEquipmentUseCase.execute({
      id: 'equipment-id',
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-002',
      status: 'available',
      last_maintenance: new Date(),
    })

    await expect(
      sut.execute('equipment-id', {
        name: 'Leg Press Machine',
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: 'LEG-001',
        status: 'available',
      }),
    ).rejects.toBeInstanceOf(EquipmentCodeAlreadyRegisteredError)
  })
})
