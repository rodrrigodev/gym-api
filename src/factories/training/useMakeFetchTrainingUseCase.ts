import { PrismaTrainingRepository } from '@/repositories/prisma/prismaTrainingRepository'
import { FetchTrainingsUseCase } from '@/useCases/training/fetchTrainingsUseCase'

export function useMakeFetchTrainingUseCase() {
  const prismaTrainingRepository = new PrismaTrainingRepository()

  const fetchTrainingUseCase = new FetchTrainingsUseCase(
    prismaTrainingRepository,
  )

  return fetchTrainingUseCase
}
