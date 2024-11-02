import { EquipmentAlreadyRegisteredError } from '@/errors/EquipmentAlreadyRegisteredError'
import { GymEquipmentRepository } from '@/repositories/gymEquipmentRepository'

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
      await this.gymEquipmentRepository.checkNameAndCode(data.name, data.cod)

    if (equipmentAlreadyRegistered) {
      throw new EquipmentAlreadyRegisteredError()
    }

    const newEquipment =
      await this.gymEquipmentRepository.createGymEquipment(data)

    return newEquipment
  }
}
