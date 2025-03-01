import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { TrainingAndGymEquipmentRepository } from '@/repositories/interfaces/trainingAndGymEquipmentRepository'

interface DeleteTrainingAndGymEquipmentUseCaseRequest {
  trainingId: string
  gymEquipmentId: string
}

export class DeleteTrainingAndGymEquipmentUseCase {
  constructor(
    private trainingAndGymEquipmentRepository: TrainingAndGymEquipmentRepository,
  ) {}

  async execute({
    trainingId,
    gymEquipmentId,
  }: DeleteTrainingAndGymEquipmentUseCaseRequest) {
    const trainingExists =
      await this.trainingAndGymEquipmentRepository.findTrainingsAndGymEquipment(
        trainingId,
      )

    if (!trainingExists.length) {
      throw new TrainingNotFoundError()
    }

    const equipmentExists = trainingExists.find((equipment) => {
      return equipment.gymEquipmentId === gymEquipmentId
    })

    if (!equipmentExists) {
      throw new EquipmentNotFoundError()
    }

    return await this.trainingAndGymEquipmentRepository.deleteTrainingEquipment(
      trainingId,
      gymEquipmentId,
    )
  }
}
