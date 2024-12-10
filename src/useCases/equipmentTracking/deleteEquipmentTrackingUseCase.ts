import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/equipmentTrackingRepository'

export class DeleteEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
  ) {}

  async execute(equipmentTrackingId: string, userProgressId: string) {
    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.checkEquipmentAndUser(
        equipmentTrackingId,
        userProgressId,
      )

    if (!gymEquipmentTrackingExists) {
      throw new EquipmentTrackingNotFoundError()
    }

    const gymEquipmentTrackingUpdated =
      await this.equipmentTrackingRepository.deleteEquipmentTracking(
        equipmentTrackingId,
      )

    return gymEquipmentTrackingUpdated
  }
}