import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { AuthenticateUseCase } from '@/useCases/user/authenticateUserUseCase'

export function useMakeAuthenticateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()

  const createUserProgressRepository = new AuthenticateUseCase(
    prismaUserRepository,
  )

  return createUserProgressRepository
}
