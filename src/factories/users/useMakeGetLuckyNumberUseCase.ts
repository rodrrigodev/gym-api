import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { GetLuckyNumberUseCase } from '@/useCases/user/getLuckyNumberUseCase'

export function useMakeGetLuckyNumberUseCase() {
  const prismaUserRepository = new PrismaUserRepository()

  const getLuckyNumberUseCase = new GetLuckyNumberUseCase(prismaUserRepository)

  return getLuckyNumberUseCase
}
