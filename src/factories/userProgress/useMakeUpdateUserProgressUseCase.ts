import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { UpdateUserProgressUseCase } from '@/useCases/userProgress/updateUserProgressUseCase'

export function useMakeUpdateUserProgressUseCase() {
  const prismaUserProgressRepository = new PrismaUserProgressRepository()

  const updateUserProgressRepository = new UpdateUserProgressUseCase(
    prismaUserProgressRepository,
  )

  return updateUserProgressRepository
}
