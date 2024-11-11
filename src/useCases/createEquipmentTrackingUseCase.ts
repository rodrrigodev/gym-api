import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { EquipmentTrackingAlreadyExistsError } from '@/errors/equipmentTrackingAlreadyExistsError'
import { EquipmentTrackingRepository } from '@/repositories/equipmentTrackingRepository'
import { GymEquipmentRepository } from '@/repositories/gymEquipmentRepository'

interface CreateEquipmentTrackingRequest {
  actual_weight: number
  initial_weight: number
  gym_equipment_id: string
  user_progress_id: string
}

export class CreateEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
  ) {}

  async execute({
    actual_weight,
    gym_equipment_id,
    initial_weight,
    user_progress_id,
  }: CreateEquipmentTrackingRequest) {
    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.findGymEquipmentTracking(
        gym_equipment_id,
      )

    if (gymEquipmentTrackingExists) {
      throw new EquipmentTrackingAlreadyExistsError()
    }

    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipmentById(gym_equipment_id)

    if (!gymEquipmentExists) {
      throw new EquipmentsNotFoundError()
    }

    const gymEquipmentTracking =
      await this.equipmentTrackingRepository.createEquipmentTracking({
        actual_weight,
        initial_weight,
        user_progress_id,
        gym_equipment_id,
      })

    return gymEquipmentTracking
  }
}
