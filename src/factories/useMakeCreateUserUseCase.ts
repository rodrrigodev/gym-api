import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { CreateUserUseCase } from '@/useCases/createUserUseCase'

export function useMakeCreateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

  return createUserUseCase
}
