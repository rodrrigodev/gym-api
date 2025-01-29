import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'

export class DeleteEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
  ) {}

  async execute(id: string) {
    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.findEquipmentTracking(id)

    if (!gymEquipmentTrackingExists) {
      throw new EquipmentTrackingNotFoundError()
    }

    const gymEquipmentTrackingUpdated =
      await this.equipmentTrackingRepository.deleteEquipmentTracking(
        gymEquipmentTrackingExists.id,
      )

    return gymEquipmentTrackingUpdated
  }
}
