import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

interface CreateTrainingRequest {
  level: string
  category: string
  type: string
  age_group: string
  gender: string
}

export class CreateTrainingUseCase {
  constructor(private trainingRepository: TrainingRepository) {}

  async execute(data: CreateTrainingRequest) {
    const training = await this.trainingRepository.createTraining(data)
    return training
  }
}
