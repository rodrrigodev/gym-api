import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

interface CreateGymEquipmentRequest {
  name: string
  category: string
  sets: number
  reps: number
  cod: string
  status: string
  last_maintenance: Date
}

export class CreateGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(data: CreateGymEquipmentRequest) {
    const equipmentAlreadyRegistered =
      await this.gymEquipmentRepository.checkGymEquipmentCode(data.cod)

    if (equipmentAlreadyRegistered) {
      throw new EquipmentCodeAlreadyRegisteredError()
    }

    const newEquipment =
      await this.gymEquipmentRepository.createGymEquipment(data)

    return newEquipment
  }
}
