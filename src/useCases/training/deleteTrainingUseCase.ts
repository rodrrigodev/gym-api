import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

export class DeleteTrainingUseCase {
  constructor(private trainingRepository: TrainingRepository) {}

  async execute(id: string) {
    const trainingExists = await this.trainingRepository.findTraining(id)

    if (!trainingExists) {
      throw new TrainingNotFoundError()
    }

    return await this.trainingRepository.deleteTraining(trainingExists.id)
  }
}
