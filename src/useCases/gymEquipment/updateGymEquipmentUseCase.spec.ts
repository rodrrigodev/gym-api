import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { UpdateGymEquipmentUseCase } from './updateGymEquipmentUseCase'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: UpdateGymEquipmentUseCase

describe('update gym equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new UpdateGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to update a gym equipment', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const updatedGymEquipment = await sut.execute(gymEquipment.id, {
      name: 'Seated Dip Machine',
      sets: 3,
    })

    expect(updatedGymEquipment?.name).toBe('Seated Dip Machine')
    expect(updatedGymEquipment?.sets).toBe(3)
    expect(updatedGymEquipment).toHaveProperty('cod', 'LEG-001')
  })

  it('should not be able to update a gym equipment passing code already created', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const gymEquipment =
      await inMemoryGymEquipmentRepository.createGymEquipment({
        name: 'Leg Press Machine',
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: 'LEG-002',
        status: 'available',
        last_maintenance: new Date(),
      })

    await expect(
      sut.execute(gymEquipment.id, {
        name: 'Leg Press Machine',
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: 'LEG-002',
        status: 'available',
      }),
    ).rejects.toBeInstanceOf(EquipmentCodeAlreadyRegisteredError)
  })

  it('should not be able to update a gym equipment passing wrong id', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(
      sut.execute('wrongId', {
        name: 'Leg Press Machine',
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: 'LEG-001',
        status: 'available',
      }),
    ).rejects.toBeInstanceOf(EquipmentNotFoundError)
  })
})
