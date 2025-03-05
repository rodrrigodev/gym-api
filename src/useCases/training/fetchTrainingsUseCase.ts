import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

export class FetchTrainingsUseCase {
  constructor(private trainingRepository: TrainingRepository) {}

  async execute(page: number) {
    const trainings = await this.trainingRepository.fetchTrainings(page)

    if (!trainings.trainings.length) {
      throw new TrainingNotFoundError()
    }

    return trainings
  }
}
