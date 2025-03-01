import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'

interface FetchEquipmentTrackingDetailsUseCaseRequest {
  userProgressId: string
  equipmentIds: string[]
}

export class FetchEquipmentTrackingDetailsUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
  ) {}

  async execute({
    userProgressId,
    equipmentIds,
  }: FetchEquipmentTrackingDetailsUseCaseRequest) {
    const equipmentTracking =
      await this.equipmentTrackingRepository.fetchEquipmentTrackings(
        equipmentIds,
        userProgressId,
      )

    if (!equipmentTracking.length) throw new EquipmentTrackingNotFoundError()

    return equipmentTracking
  }
}
