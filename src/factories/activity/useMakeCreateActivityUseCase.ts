import { PrismaActivityRepository } from '@/repositories/prisma/prismaActivityRepository'
import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { CreateActivityUseCase } from '@/useCases/activity/createActivityUseCase'

export function useMakeCreateActivityUseCase() {
  const prismaActivityRepository = new PrismaActivityRepository()
  const prismaUserProgressRepository = new PrismaUserProgressRepository()

  const createActivityUseCase = new CreateActivityUseCase(
    prismaActivityRepository,
    prismaUserProgressRepository,
  )

  return createActivityUseCase
}
