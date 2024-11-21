import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { GymEquipmentRepository } from '@/repositories/gymEquipmentRepository'

export class DeleteGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(gymEquipmentId: string) {
    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipmentById(gymEquipmentId)

    if (!gymEquipmentExists) {
      throw new EquipmentNotFoundError()
    }

    const message = await this.gymEquipmentRepository.deleteGymEquipment(
      gymEquipmentExists.id,
    )

    return message
  }
}
