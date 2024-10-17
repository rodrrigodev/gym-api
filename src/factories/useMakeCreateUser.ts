import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { CreateUserUseCase } from '@/useCases/createUserUseCase'

export function useMakeCreateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const createUserController = new CreateUserUseCase(prismaUserRepository)

  return createUserController
}
