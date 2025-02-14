import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import {  equipmentNotFoundError } from '@/errors/ equipmentNotFoundError'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { FetchGym equipmentUseCase } from './fetchGym equipmentUseCase'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: FetchGym equipmentUseCase

describe('fetch gym  equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new FetchGym equipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to fetch gym  equipment', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const gym equipment = await sut.execute('legs')

    expect(gym equipment).toHaveLength(26)
  })

  it('should not be able to fetch gym  equipment passing non-existent workout', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(sut.execute('noNextWorkout')).rejects.toBeInstanceOf(
       equipmentNotFoundError,
    )
  })
})
