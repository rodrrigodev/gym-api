import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

export class DeleteGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(gymEquipmentId: string) {
    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipment(gymEquipmentId)

    if (!gymEquipmentExists) {
      throw new EquipmentNotFoundError()
    }

    const gymEquipmentUpdated =
      await this.gymEquipmentRepository.deleteGymEquipment(
        gymEquipmentExists.id,
      )

    return gymEquipmentUpdated
  }
}
