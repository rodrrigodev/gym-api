import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { TrainingAndGymEquipmentRepository } from '@/repositories/interfaces/trainingAndGymEquipmentRepository'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

interface AddTrainingEquipmentUseCaseRequest {
  trainingId: string
  gymEquipmentIds: string[]
}

export class AddTrainingEquipmentUseCase {
  constructor(
    private trainingAndGymEquipmentRepository: TrainingAndGymEquipmentRepository,
    private trainingRepository: TrainingRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
  ) {}

  async execute({
    trainingId,
    gymEquipmentIds,
  }: AddTrainingEquipmentUseCaseRequest) {
    const trainingExists =
      await this.trainingRepository.findTraining(trainingId)

    if (!trainingExists) {
      throw new Error()
    }

    const gymEquipmentExists =
      await this.gymEquipmentRepository.fetchGymEquipmentByIds(gymEquipmentIds)

    if (!gymEquipmentExists) {
      throw new Error()
    }

    const equipmentIds = gymEquipmentExists.map((equipment) => {
      return equipment.id
    })

    await this.trainingAndGymEquipmentRepository.createTrainingAndGymEquipment({
      trainingId,
      gymEquipmentIds: equipmentIds,
    })

    return { trainingId, gymEquipment: gymEquipmentExists }
  }
}
