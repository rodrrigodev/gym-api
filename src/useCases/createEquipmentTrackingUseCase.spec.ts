import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { CreateEquipmentTrackingUseCase } from './createEquipmentTrackingUseCase'
import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { EquipmentTrackingAlreadyExistsError } from '@/errors/equipmentTrackingAlreadyExistsError'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let inMemoryEquipmentTrackingRepository: InMemoryEquipmentTrackingRepository
let sut: CreateEquipmentTrackingUseCase

describe('create gym equipment tracking test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    inMemoryEquipmentTrackingRepository =
      new InMemoryEquipmentTrackingRepository()

    sut = new CreateEquipmentTrackingUseCase(
      inMemoryEquipmentTrackingRepository,
      inMemoryGymEquipmentRepository,
    )
  })

  it('should be able to create a gym equipment tracking', async () => {
    const gymEquipment =
      await inMemoryGymEquipmentRepository.createGymEquipment({
        name: 'Leg Press Machine',
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: 'LEG-001',
        status: 'available',
        last_maintenance: new Date(),
      })

    const equipmentTracking = await sut.execute({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipment.id,
      user_progress_id: 'user_id',
    })

    expect(equipmentTracking?.actual_weight).toBe(5)
    expect(equipmentTracking?.user_progress_id).toBe('user_id')
  })

  it('should not be able to create a gym equipment', async () => {
    await inMemoryGymEquipmentRepository.createGymEquipment({
      id: 'equipment_id',
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    await sut.execute({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: 'equipment_id',
      user_progress_id: 'user_id',
    })

    await expect(
      sut.execute({
        initial_weight: 1,
        actual_weight: 5,
        gym_equipment_id: 'equipment_id',
        user_progress_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(EquipmentTrackingAlreadyExistsError)
  })

  it('should not be able to create a gym equipment', async () => {
    await inMemoryGymEquipmentRepository.createGymEquipment({
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
        initial_weight: 1,
        actual_weight: 5,
        gym_equipment_id: 'equipment_id',
        user_progress_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(EquipmentsNotFoundError)
  })
})
