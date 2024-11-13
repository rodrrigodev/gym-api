import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { UpdateEquipmentTrackingUseCase } from './updateEquipmentTrackingUseCase'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let inMemoryEquipmentTrackingRepository: InMemoryEquipmentTrackingRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: UpdateEquipmentTrackingUseCase

describe('update gym equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    inMemoryEquipmentTrackingRepository =
      new InMemoryEquipmentTrackingRepository()
    sut = new UpdateEquipmentTrackingUseCase(
      inMemoryEquipmentTrackingRepository,
    )
  })

  // gym_equipment_id: string,
  //   actual_weight: number,
  //   user_progress_id: string,

  it('should be able to update a equipment tracking', async () => {
    const userProgress =
      await inMemoryUserProgressRepository.createUserProgress({
        initial_weight: null,
        next_workout: null,
        last_workout: null,
        ia_analyses: null,
        ia_analyses_date: null,
        current_goal: null,
        streaks: [],
        user_id: 'userId',
      })

    await inMemoryGymEquipmentRepository.createGymEquipment({
      id: 'equipment-id',
      name: 'Leg Press Machine',
      category: 'legs',
      sets: 4,
      reps: 12,
      cod: 'LEG-001',
      status: 'available',
      last_maintenance: new Date(),
    })

    await inMemoryEquipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: 'equipment-id',
      user_progress_id: 'user_id',
    })

    const updatedGymEquipment = await sut.execute('equipment-id', 15)

    // expect(updatedGymEquipment?.name).toBe('Seated Dip Machine')
    // expect(updatedGymEquipment?.sets).toBe(3)
    // expect(updatedGymEquipment).toHaveProperty('cod', 'LEG-001')
  })

  it.skip('should not be able to update a gym equipment', async () => {
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
