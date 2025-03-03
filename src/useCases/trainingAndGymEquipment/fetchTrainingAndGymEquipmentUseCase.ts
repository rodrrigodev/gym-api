import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { TrainingAndGymEquipmentRepository } from '@/repositories/interfaces/trainingAndGymEquipmentRepository'

export class FetchTrainingAndGymEquipmentUseCase {
  constructor(
    private trainingAndGymEquipmentRepository: TrainingAndGymEquipmentRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
  ) {}

  async execute(trainingId: string) {
    const trainingExists =
      await this.trainingAndGymEquipmentRepository.findTrainingsAndGymEquipment(
        trainingId,
      )

    if (!trainingExists.length) {
      throw new TrainingNotFoundError()
    }

    const gymIds = trainingExists.map((equipment) => {
      return equipment.gymEquipmentId
    })

    const gymEquipment = await this.gymEquipmentRepository.fetchGymEquipment({
      ids: gymIds,
    })

    if (!gymEquipment?.length) {
      throw new EquipmentNotFoundError()
    }

    return { trainingId, gymEquipment }
  }
}
