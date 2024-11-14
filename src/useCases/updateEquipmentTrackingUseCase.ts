import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/equipmentTrackingRepository'

export class UpdateEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
  ) {}

  async execute(
    gym_equipment_id: string,
    user_progress_id: string,
    actual_weight: number,
  ) {
    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.checkEquipmentAndUser(
        gym_equipment_id,
        user_progress_id,
      )

    if (!gymEquipmentTrackingExists) {
      throw new EquipmentTrackingNotFoundError()
    }

    const gymEquipmentTrackingUpdated =
      await this.equipmentTrackingRepository.updateEquipmentTracking(
        gym_equipment_id,
        { actual_weight },
      )

    return gymEquipmentTrackingUpdated
  }
}
