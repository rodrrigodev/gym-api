import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

export class FetchGymEquipmentsUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(category: string) {
    const gymEquipments =
      await this.gymEquipmentRepository.fetchGymEquipments(category)

    if (!gymEquipments.length) {
      throw new EquipmentsNotFoundError()
    }

    return gymEquipments
  }
}
