import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

interface UpdateGymEquipmentRequest {
  name?: string
  category?: string
  sets?: number
  reps?: number
  cod?: string
  status?: string
  last_maintenance?: Date
}

export class UpdateGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(id: string, data: UpdateGymEquipmentRequest) {
    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipment(id)

    if (!gymEquipmentExists) {
      throw new EquipmentNotFoundError()
    }

    const equipmentCodeAlreadyRegistered = gymEquipmentExists.cod === data.cod

    if (equipmentCodeAlreadyRegistered) {
      throw new EquipmentCodeAlreadyRegisteredError()
    }

    const gymEquipmentUpdated =
      await this.gymEquipmentRepository.updateGymEquipment(id, data)

    return gymEquipmentUpdated
  }
}
