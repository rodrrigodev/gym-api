import {  equipmentNotFoundError } from '@/errors/ equipmentNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

export class FetchGym equipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(category: string) {
    const gym equipment =
      await this.gymEquipmentRepository.fetchGym equipment(category)

    if (!gym equipment.length) {
      throw new  equipmentNotFoundError()
    }

    return gym equipment
  }
}
