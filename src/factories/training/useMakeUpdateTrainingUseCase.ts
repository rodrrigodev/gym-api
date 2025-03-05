import { PrismaTrainingRepository } from '@/repositories/prisma/prismaTrainingRepository'
import { UpdateTrainingsUseCase } from '@/useCases/training/updateTrainingUseCase'

export function useMakeUpdateTrainingUseCase() {
  const prismaTrainingRepository = new PrismaTrainingRepository()

  const updateTrainingUseCase = new UpdateTrainingsUseCase(
    prismaTrainingRepository,
  )

  return updateTrainingUseCase
}
