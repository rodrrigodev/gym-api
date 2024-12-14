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
}

export class UpdateGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(id: string, data: UpdateGymEquipmentRequest) {
    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipmentById(id)

    if (!gymEquipmentExists) {
      throw new EquipmentNotFoundError()
    }

    const equipmentCodeAlreadyRegistered = data.cod
      ? await this.gymEquipmentRepository.checkGymEquipmentCode(data.cod)
      : null

    if (
      equipmentCodeAlreadyRegistered &&
      equipmentCodeAlreadyRegistered.id !== id
    ) {
      throw new EquipmentCodeAlreadyRegisteredError()
    }

    const gymEquipmentUpdated =
      await this.gymEquipmentRepository.updateGymEquipment(id, data)

    return gymEquipmentUpdated
  }
}
