import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { UpdateUserUseCase } from '@/useCases/UpdateUserUseCase'

export function useMakeUpdateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository)

  return updateUserUseCase
}
