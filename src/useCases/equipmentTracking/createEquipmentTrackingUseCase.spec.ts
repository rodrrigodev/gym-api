import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryEquipmentTrackingRepository } from '@/repositories/inMemory/inMemoryEquipmentTrackingRepository'
import { CreateEquipmentTrackingUseCase } from './createEquipmentTrackingUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { EquipmentTrackingAlreadyExistsError } from '@/errors/equipmentTrackingAlreadyExistsError'
import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { UserProgressError } from '@/errors/userProgressError'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'

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
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const userProgress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: 'user_id',
    })

    const equipmentTracking = await sut.execute({
      initialWeight: 1,
      actualWeight: 5,
      gymEquipmentId: gymEquipment.id,
      userProgressId: userProgress.id,
      active: true,
    })

    expect(equipmentTracking?.actual_weight).toBe(5)
    expect(equipmentTracking?.user_progress_id).toEqual(expect.any(String))
  })

  it('should  not be able to create a gym equipment tracking passing wrong user progress id', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: 'user_id',
    })

    await expect(
      sut.execute({
        initialWeight: 1,
        actualWeight: 5,
        gymEquipmentId: gymEquipment.id,
        userProgressId: 'wrong_userProgress_id',
        active: true,
      }),
    ).rejects.toBeInstanceOf(UserProgressError)
  })

  it('should  not be able to create the same gym equipment tracking twice', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const userProgress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: 'user_id',
    })

    await sut.execute({
      initialWeight: 1,
      actualWeight: 5,
      gymEquipmentId: gymEquipment.id,
      userProgressId: userProgress.id,
      active: true,
    })

    await expect(
      sut.execute({
        initialWeight: 1,
        actualWeight: 5,
        gymEquipmentId: gymEquipment.id,
        userProgressId: userProgress.id,
        active: true,
      }),
    ).rejects.toBeInstanceOf(EquipmentTrackingAlreadyExistsError)
  })

  it('should  not be able to create a gym equipment tracking passing wrong equipment id', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const userProgress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: 'user_id',
    })

    await expect(
      sut.execute({
        initialWeight: 1,
        actualWeight: 5,
        gymEquipmentId: 'wrong_gymEquipment_id',
        userProgressId: userProgress.id,
        active: true,
      }),
    ).rejects.toBeInstanceOf(EquipmentsNotFoundError)
  })
})
