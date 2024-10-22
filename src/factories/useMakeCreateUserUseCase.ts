import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { DeleteUserUseCase } from '@/useCases/deleteUserUseCase'

export function useMakeDeleteUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository)

  return deleteUserUseCase
}
