import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { PrismaPrizeDrawRepository } from '@/repositories/prisma/prismaPrizeDrawRepository'
import { DrawParticipantWinnerUseCase } from '@/useCases/prizeDraw/drawParticipantWinnerUseCase'

export function useMakeDrawParticipantWinnerUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const prizeDrawRepository = new PrismaPrizeDrawRepository()

  const drawParticipantWinnerUseCase = new DrawParticipantWinnerUseCase(
    prizeDrawRepository,
    prismaUserRepository,
  )

  return drawParticipantWinnerUseCase
}
