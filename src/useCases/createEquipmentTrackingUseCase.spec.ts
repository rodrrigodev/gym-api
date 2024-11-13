import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { CreateEquipmentTrackingUseCase } from './createEquipmentTrackingUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let inMemoryEquipmentTrackingRepository: InMemoryEquipmentTrackingRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: CreateEquipmentTrackingUseCase

describe('create gym equipment tracking test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    inMemoryEquipmentTrackingRepository =
      new InMemoryEquipmentTrackingRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()

    sut = new CreateEquipmentTrackingUseCase(
      inMemoryEquipmentTrackingRepository,
      inMemoryGymEquipmentRepository,
      inMemoryUserProgressRepository,
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

    const userProgress =
      await inMemoryUserProgressRepository.createUserProgress({
        current_goal: 'bulk up',
        initial_weight: 88,
        next_workout: null,
        user_id: 'user_id',
      })

    const equipmentTracking = await sut.execute({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipment.id,
      user_progress_id: userProgress.user_id,
    })

    expect(equipmentTracking?.actual_weight).toBe(5)
    expect(equipmentTracking?.user_progress_id).toBe('user_id')
  })

  it.todo(
    'should  not be able to create a gym equipment tracking',
    // async () => {
    //   const gymEquipment =
    //     await inMemoryGymEquipmentRepository.createGymEquipment({
    //       name: 'Leg Press Machine',
    //       category: 'legs',
    //       sets: 4,
    //       reps: 12,
    //       cod: 'LEG-001',
    //       status: 'available',
    //       last_maintenance: new Date(),
    //     })

    //   const userProgress =
    //     await inMemoryUserProgressRepository.createUserProgress({
    //       current_goal: 'bulk up',
    //       initial_weight: 88,
    //       next_workout: null,
    //       user_id: 'user_id',
    //     })

    //   await expect(
    //     sut.execute({
    //       initial_weight: 1,
    //       actual_weight: 5,
    //       gym_equipment_id: gymEquipment.id,
    //       user_progress_id: userProgress.user_id,
    //     }),
    //   ).rejects.toBeInstanceOf(EquipmentTrackingAlreadyExistsError)
    // },
  )
})
