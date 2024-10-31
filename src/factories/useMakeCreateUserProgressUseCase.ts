import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { CreateUserProgressUseCase } from '@/useCases/createUserProgressUseCase'
import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'

export function useMakeCreateUserProgressUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const prismaUserProgressRepository = new PrismaUserProgressRepository()

  const createUserProgressRepository = new CreateUserProgressUseCase(
    prismaUserProgressRepository,
    prismaUserRepository,
  )

  return createUserProgressRepository
}
