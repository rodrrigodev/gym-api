import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryGymEquipmentRepository } from '@/repositories/inMemory/inMemoryGymEquipmentRepository'
import { createGymEquipmentTestHelper } from '@/tests/createGymEquipmentTestHelper'
import { FetchGymEquipmentUseCase } from './fetchGymEquipmentUseCase'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { NotAllowedError } from '@/errors/notAllowedError'

let inMemoryGymEquipmentRepository: InMemoryGymEquipmentRepository
let sut: FetchGymEquipmentUseCase

describe('fetch gym  equipment test', () => {
  beforeEach(() => {
    inMemoryGymEquipmentRepository = new InMemoryGymEquipmentRepository()
    sut = new FetchGymEquipmentUseCase(inMemoryGymEquipmentRepository)
  })

  it('should be able to fetch gym  equipment', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    const gymEquipment = await sut.execute({ category: 'legs' })

    expect(gymEquipment).toHaveLength(26)
  })

  it('should not be able to fetch gym  equipment passing ids and category same time', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(
      sut.execute({ category: 'legs', ids: [] }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to fetch gym  equipment passing wrong category', async () => {
    await createGymEquipmentTestHelper(inMemoryGymEquipmentRepository)

    await expect(
      sut.execute({ category: 'wrongCategory' }),
    ).rejects.toBeInstanceOf(EquipmentNotFoundError)
  })
})
