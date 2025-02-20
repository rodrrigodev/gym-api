import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { UpdateUserUseCase } from '@/useCases/user/updateUserUseCase'

export function useMakeUpdateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository)

  return updateUserUseCase
}
