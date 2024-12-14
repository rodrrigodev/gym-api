import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

export class FetchGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(nextWorkout: string) {
    const gymEquipments =
      await this.gymEquipmentRepository.fetchGymEquipments(nextWorkout)

    if (!gymEquipments.length) {
      throw new EquipmentsNotFoundError()
    }

    return gymEquipments
  }
}
