import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { FetchUsersOrSearchUseCase } from '@/useCases/fetchUsersOrSearchUseCase'

export function useMakeFetchUsersOrSearchUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const fetchUsersOrSearchUseCase = new FetchUsersOrSearchUseCase(
    prismaUserRepository,
  )

  return fetchUsersOrSearchUseCase
}
