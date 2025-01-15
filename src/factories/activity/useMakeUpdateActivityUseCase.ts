import { PrismaActivityRepository } from '@/repositories/prisma/prismaActivityRepository'
import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { UpdateActivityUseCase } from '@/useCases/activity/updateActivityUseCase'

export function useMakeUpdateActivityUseCase() {
  const prismaActivityRepository = new PrismaActivityRepository()
  const prismaUserProgressRepository = new PrismaUserProgressRepository()

  const updateActivityUseCase = new UpdateActivityUseCase(
    prismaActivityRepository,
    prismaUserProgressRepository,
  )

  return updateActivityUseCase
}
