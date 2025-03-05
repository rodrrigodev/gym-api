import { PrismaTrainingRepository } from '@/repositories/prisma/prismaTrainingRepository'
import { CreateTrainingUseCase } from '@/useCases/training/createTrainingUseCase'

export function useMakeCreateTrainingUseCase() {
  const prismaTrainingRepository = new PrismaTrainingRepository()

  const createTrainingUseCase = new CreateTrainingUseCase(
    prismaTrainingRepository,
  )

  return createTrainingUseCase
}
