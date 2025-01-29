import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { DeleteGymEquipmentUseCase } from './deleteGymEquipmentUseCase'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: DeleteGymEquipmentUseCase

describe('delete a gym equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new DeleteGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to delete a gym equipment', async () => {
    const gymEquipment = await createGymEquipmentTestHelper(
      inMemoryGymEquipmentRepository,
    )

    const message = await sut.execute(gymEquipment.id)

    expect(message).toEqual(
      expect.stringContaining('Gym equipment deleted successfully!'),
    )
  })

  it('should not be able to delete a gym equipment passing wrong id', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(sut.execute('wrongId')).rejects.toBeInstanceOf(
      EquipmentNotFoundError,
    )
  })
})
