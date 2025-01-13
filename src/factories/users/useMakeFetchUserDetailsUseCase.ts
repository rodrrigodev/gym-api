import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { FetchUserDetailsUseCase } from '@/useCases/user/fetchUserDetailsUseCase'

export function useMakeFetchUserDetailsUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const prismaUserProgressRepository = new PrismaUserProgressRepository()
  const fetchUserDetailsUseCase = new FetchUserDetailsUseCase(
    prismaUserRepository,
    prismaUserProgressRepository,
  )

  return fetchUserDetailsUseCase
}
