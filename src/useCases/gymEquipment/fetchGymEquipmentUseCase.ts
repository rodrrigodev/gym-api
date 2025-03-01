import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { NotAllowedError } from '@/errors/notAllowedError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

interface FetchGymEquipmentUseCaseRequest {
  ids?: string[]
  category?: string
}

export class FetchGymEquipmentUseCase {
  constructor(private gymEquipmentRepository: GymEquipmentRepository) {}

  async execute(data: FetchGymEquipmentUseCaseRequest) {
    if (data.category && data.ids) throw new NotAllowedError()

    const gymEquipment = await this.gymEquipmentRepository.fetchGymEquipment({
      category: data.category,
      ids: data.ids ?? [],
    })

    if (!gymEquipment.length) throw new EquipmentNotFoundError()

    return gymEquipment
  }
}
