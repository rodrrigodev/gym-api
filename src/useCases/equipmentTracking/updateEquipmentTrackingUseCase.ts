import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'

export class UpdateEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
  ) {}

  async execute(id: string, actualWeight: number) {
    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.findEquipmentTracking(id)

    if (!gymEquipmentTrackingExists) {
      throw new EquipmentTrackingNotFoundError()
    }

    const gymEquipmentTrackingUpdated =
      await this.equipmentTrackingRepository.updateEquipmentTracking(id, {
        actual_weight: actualWeight,
      })

    return gymEquipmentTrackingUpdated
  }
}
