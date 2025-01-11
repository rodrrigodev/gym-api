import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { PrismaPrizeDrawRepository } from '@/repositories/prisma/prizeDrawRepository'
import { FetchUserDetailsUseCase } from '@/useCases/user/fetchUserDetailsUseCase'

export function useMakeCreatePrizeDrawUseCase() {
  const prismaPrizeDrawRepository = new PrismaPrizeDrawRepository()
  const prismaUserProgressRepository = new PrismaUserProgressRepository()
  const fetchUserDetailsUseCase = new FetchUserDetailsUseCase(
    prismaUserRepository,
    prismaUserProgressRepository,
  )

  return fetchUserDetailsUseCase
}
