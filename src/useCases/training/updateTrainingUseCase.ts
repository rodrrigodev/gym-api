import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

interface UpdateTrainingsUseCaseRequest {
  id: string
  level?: string
  category?: string
  type?: string
  age_group?: string
  gender?: string
}

export class UpdateTrainingsUseCase {
  constructor(private trainingRepository: TrainingRepository) {}

  async execute(data: UpdateTrainingsUseCaseRequest) {
    const training = await this.trainingRepository.findTraining(data.id)

    if (!training) {
      throw new TrainingNotFoundError()
    }

    return await this.trainingRepository.updateTraining(data.id, {
      level: data.level || training.level,
      category: data.category || training.category,
      type: data.type || training.type,
      age_group: data.age_group || training.age_group,
      gender: data.gender || training.gender,
    })
  }
}
