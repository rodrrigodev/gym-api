import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { FetchUsersOrSearchUseCase } from '@/useCases/user/fetchUsersOrSearchUseCase'

export function useMakeGeneratePrizeDrawWinnerUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const fetchUsersOrSearchUseCase = new FetchUsersOrSearchUseCase(
    prismaUserRepository,
  )

  return fetchUsersOrSearchUseCase
}
