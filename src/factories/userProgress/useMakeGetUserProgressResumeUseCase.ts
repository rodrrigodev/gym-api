import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { GetUserProgressResumeUseCase } from '@/useCases/userProgress/fetchUserProgressResumeUseCase'
import { PrismaActivityRepository } from '@/repositories/prisma/prismaActivityRepository'

export function useMakeGetUserProgressResumeUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const prismaUserProgressRepository = new PrismaUserProgressRepository()
  const prismaActivityRepository = new PrismaActivityRepository()

  const getUserProgressResumeUseCase = new GetUserProgressResumeUseCase(
    prismaUserRepository,
    prismaUserProgressRepository,
    prismaActivityRepository,
  )

  return getUserProgressResumeUseCase
}
