import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

export class FetchGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(category: string) {
    const gymEquipment =
      await this.gymEquipmentRepository.fetchGymEquipment(category)

    if (!gymEquipment.length) {
      throw new EquipmentNotFoundError()
    }

    return gymEquipment
  }
}
