import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { TrainingAndGymEquipmentRepository } from '@/repositories/interfaces/trainingAndGymEquipmentRepository'

export class FetchEquipmentTrackingDetailsUseCase {
  constructor(
    private gymEquipmentRepository: GymEquipmentRepository,
    private equipmentTrackingRepository: EquipmentTrackingRepository,
    private trainingAndGymEquipment: TrainingAndGymEquipmentRepository,
  ) {}

  async execute(trainingIds: string[]) {
    const trainingGymEquipment =
      await this.trainingAndGymEquipment.findTrainingsAndGymEquipment(
        trainingIds,
      )

    if (!trainingGymEquipment.length) throw new EquipmentNotFoundError()

    const equipmentIds = trainingGymEquipment.map((equipment) => {
      return equipment.gymEquipmentId
    })

    const gymEquipmentTracking =
      await this.equipmentTrackingRepository.findEquipmentTrackings(
        equipmentIds,
      )

    if (!gymEquipmentTracking.length) {
      throw new EquipmentTrackingNotFoundError()
    }

    const gymEquipment =
      await this.gymEquipmentRepository.findGymEquipmentByIds(equipmentIds)

    if (!gymEquipment.length) {
      throw new EquipmentNotFoundError()
    }

    const equipmentTrackingDetails = gymEquipmentTracking.map((tracking) => {
      const equipment = gymEquipment.find(
        (equipment) => equipment.id === tracking.gym_equipment_id,
      )

      return equipment
        ? {
            equipmentName: equipment.name,
            set: equipment.sets,
            reps: equipment.reps,
            initialWeight: tracking.initial_weight,
            actualWeight: tracking.actual_weight,
          }
        : null
    })

    return equipmentTrackingDetails
  }
}
