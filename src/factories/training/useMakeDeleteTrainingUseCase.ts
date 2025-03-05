import { PrismaTrainingRepository } from '@/repositories/prisma/prismaTrainingRepository'
import { DeleteTrainingUseCase } from '@/useCases/training/deleteTrainingUseCase'

export function useMakeDeleteTrainingUseCase() {
  const prismaTrainingRepository = new PrismaTrainingRepository()

  const deleteTrainingUseCase = new DeleteTrainingUseCase(
    prismaTrainingRepository,
  )

  return deleteTrainingUseCase
}
