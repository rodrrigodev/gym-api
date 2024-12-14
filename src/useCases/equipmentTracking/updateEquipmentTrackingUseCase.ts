import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'

export class UpdateEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
  ) {}

  async execute(
    gymEquipmentId: string,
    userProgressId: string,
    actual_weight: number,
  ) {
    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.checkEquipmentAndUser(
        gymEquipmentId,
        userProgressId,
      )

    if (!gymEquipmentTrackingExists) {
      throw new EquipmentTrackingNotFoundError()
    }

    const gymEquipmentTrackingUpdated =
      await this.equipmentTrackingRepository.updateEquipmentTracking(
        gymEquipmentId,
        { actual_weight },
      )

    return gymEquipmentTrackingUpdated
  }
}
