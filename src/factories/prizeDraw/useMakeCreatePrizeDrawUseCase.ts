import { PrismaPrizeDrawRepository } from '@/repositories/prisma/prismaPrizeDrawRepository'
import { CreatePrizeDrawUseCase } from '@/useCases/prizeDraw/createPrizeDrawUseCase'

export function useMakeCreatePrizeDrawUseCase() {
  const prismaPrizeDrawRepository = new PrismaPrizeDrawRepository()

  const createPrizeDrawUseCase = new CreatePrizeDrawUseCase(
    prismaPrizeDrawRepository,
  )

  return createPrizeDrawUseCase
}
