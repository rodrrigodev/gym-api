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

    console.log('refazer logica')

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
