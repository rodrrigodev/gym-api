import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'
import { TrainingAndGymEquipmentRepository } from '@/repositories/interfaces/trainingAndGymEquipmentRepository'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

interface CreateTrainingAndGymEquipmentUseCaseRequest {
  trainingId: string
  gymEquipmentIds: string[]
}

export class CreateTrainingAndGymEquipmentUseCase {
  constructor(
    private trainingAndGymEquipmentRepository: TrainingAndGymEquipmentRepository,
    private trainingRepository: TrainingRepository,
    private gymEquipmentRepository: GymEquipmentRepository,
  ) {}

  async execute({
    trainingId,
    gymEquipmentIds,
  }: CreateTrainingAndGymEquipmentUseCaseRequest) {
    const trainingExists =
      await this.trainingRepository.findTraining(trainingId)

    if (!trainingExists) {
      throw new TrainingNotFoundError()
    }

    const gymEquipmentExists =
      await this.gymEquipmentRepository.findGymEquipmentByIds(gymEquipmentIds)

    if (!gymEquipmentExists?.length) {
      throw new EquipmentNotFoundError()
    }

    await this.trainingAndGymEquipmentRepository.createTrainingAndGymEquipment({
      trainingId,
      gymEquipmentIds,
    })

    return { trainingId, gymEquipment: gymEquipmentExists }
  }
}
