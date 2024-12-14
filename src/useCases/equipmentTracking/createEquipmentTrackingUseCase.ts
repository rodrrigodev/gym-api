import { EquipmentsNotFoundError } from '@/errors/equipmentsNotFoundError'
import { EquipmentTrackingAlreadyExistsError } from '@/errors/equipmentTrackingAlreadyExistsError'
import { UserProgressError } from '@/errors/userProgressError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

interface CreateEquipmentTrackingRequest {
  actual_weight: number
  initial_weight: number
  gym_equipment_id: string
  user_progress_id: string
  active: boolean
}

export class CreateEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
    private userProgressRepository: UserProgressRepository,
  ) {}

  async execute({
    actual_weight,
    gym_equipment_id,
    initial_weight,
    user_progress_id,
    active,
  }: CreateEquipmentTrackingRequest) {
    const userProgressExists =
      await this.userProgressRepository.findUserProgressByUserId(
        user_progress_id,
      )

    if (!userProgressExists) {
      throw new UserProgressError()
    }

    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.checkEquipmentAndUser(
        gym_equipment_id,
        user_progress_id,
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
        active,
      })

    return gymEquipmentTracking
  }
}
