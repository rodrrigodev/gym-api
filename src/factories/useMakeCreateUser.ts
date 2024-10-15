import { PrismaUserRepository } from 'repositories/prisma/prismaUserRepository'
import { CreateUserUseCase } from 'useCases/createUserUseCase'

export function useMakeCreateUserUseCase() {
  const y = new PrismaUserRepository()
  const x = new CreateUserUseCase(y)

  return x
}
