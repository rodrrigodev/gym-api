import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { TrainingAndGymEquipmentRepository } from '@/repositories/interfaces/trainingAndGymEquipmentRepository'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

interface CreateTrainingAndGymEquipmentUseCaseRequest {
  trainingId: string
  gymEquipmentId: string
}

export class CreateTrainingAndGymEquipmentUseCase {
  constructor(
    private trainingAndGymEquipmentRepository: TrainingAndGymEquipmentRepository,
    private trainingRepository: TrainingRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
  ) {}

  async execute({
    trainingId,
    gymEquipmentId,
  }: CreateTrainingAndGymEquipmentUseCaseRequest) {
    const userTrainingExists =
      await this.trainingRepository.findTraining(trainingId)

    if (!userTrainingExists) {
      throw new Error()
    }

    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipment(gymEquipmentId)

    if (!gymEquipmentExists) {
      throw new Error()
    }

    const trainingAndGymEquipment =
      await this.trainingAndGymEquipmentRepository.createTrainingAndGymEquipment(
        {
          trainingId,
          gymEquipmentId,
        },
      )

    return trainingAndGymEquipment
  }
}
