import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { CheckUserAndDateUseCase } from '@/useCases/user/checkLoginDateUseCase'

export function useMakeCheckUserAndDateUseCase() {
  const prismaUserRepository = new PrismaUserRepository()

  const checkUserIdAndDateUseCase = new CheckUserAndDateUseCase(
    prismaUserRepository,
  )

  return checkUserIdAndDateUseCase
}
