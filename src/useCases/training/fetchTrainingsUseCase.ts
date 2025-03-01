import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

export class FetchTrainingsUseCase {
  constructor(private trainingRepository: TrainingRepository) {}

  async execute() {
    const trainings = await this.trainingRepository.fetchTrainings()

    if (!trainings.length) {
      throw new TrainingNotFoundError()
    }

    return trainings
  }
}
