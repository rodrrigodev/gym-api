import { equipmentNotFoundError } from '@/errors/ equipmentNotFoundError'
import { EquipmentTrackingAlreadyExistsError } from '@/errors/equipmentTrackingAlreadyExistsError'
import { UserProgressError } from '@/errors/userProgressError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

interface CreateEquipmentTrackingRequest {
  actualWeight: number
  initialWeight: number
  gymEquipmentId: string
  userProgressId: string
  active: boolean
}

export class CreateEquipmentTrackingUseCase {
  constructor(
    private equipmentTrackingRepository: EquipmentTrackingRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
    private userProgressRepository: UserProgressRepository,
  ) {}

  async execute({
    initialWeight,
    actualWeight,
    gymEquipmentId,
    userProgressId,
    active,
  }: CreateEquipmentTrackingRequest) {
    const userProgressExists =
      await this.userProgressRepository.findUserProgressById(userProgressId)

    if (!userProgressExists) {
      throw new UserProgressError()
    }

    const gymEquipmentTrackingExists =
      await this.equipmentTrackingRepository.checkEquipmentAndUser(
        gymEquipmentId,
        userProgressId,
      )

    if (gymEquipmentTrackingExists) {
      throw new EquipmentTrackingAlreadyExistsError()
    }

    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipment(gymEquipmentId)

    if (!gymEquipmentExists) {
      throw new equipmentNotFoundError()
    }

    const gymEquipmentTracking =
      await this.equipmentTrackingRepository.createEquipmentTracking({
        actual_weight: actualWeight,
        initial_weight: initialWeight,
        user_progress_id: userProgressExists.id,
        gym_equipment_id: gymEquipmentId,
        active,
      })

    return gymEquipmentTracking
  }
}
